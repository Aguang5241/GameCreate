(function () {
    'use strict';

    var canvas = document.getElementById('GameCanvas');
    window.onload = function () {
        if (window.__quick_compile__) {
            window.__quick_compile__.load(onload);
        }
        else {
            onload();
        }
    };
    
    function onload () {

        // socket
        // =======================
        
        // Receives a refresh event from the editor, which triggers the reload of the page
        var socket = window.io();
        socket.on('browser:reload', function () {
            window.location.reload();
        });
        socket.on('browser:confirm-reload', function () {
            var r = confirm( 'Reload?' );
            if ( r ) {
                window.location.reload();
            }
        });

        // init engine
        // =======================

        var AssetOptions = {
            libraryPath: 'res/import',
            rawAssetsBase: 'res/raw-',
            rawAssets: _CCSettings.rawAssets
        };

        // jsList
        var jsList = _CCSettings.jsList || [];
        jsList = jsList.map(function (x) { return AssetOptions.rawAssetsBase + x; });
        if (_CCSettings.jsBundleForWebPreview) {
            jsList.push(_CCSettings.jsBundleForWebPreview);
        }

        window.__modular.init(_CCSettings.scripts);
        jsList = jsList.concat(window.__modular.srcs);

        var option = {
            id: canvas,
            scenes: _CCSettings.scenes,
            debugMode: _CCSettings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
            showFPS: _CCSettings.debug,
            frameRate: 60,
            groupList: _CCSettings.groupList,
            collisionMatrix: _CCSettings.collisionMatrix,
            jsList: jsList
        };

        cc.AssetLibrary.init(AssetOptions);

        cc.game.run(option, function () {

            cc.view.enableRetina(true);
            cc.debug.setDisplayStats(true);
        
            // Loading splash scene
            var splash = document.getElementById('splash');
            var progressBar = splash.querySelector('.progress-bar span');

            cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
                splash.style.display = 'none';
            });

            cc.game.pause();

            // load stashed scene
            cc.loader.load('preview-scene.json', function (error, json) {
                if (error) {
                    cc.error(error.stack);
                    return;
                }

                cc.loader.onProgress = function (completedCount, totalCount, item) {
                    var percent = 100 * completedCount / totalCount;
                    if (progressBar) {
                        progressBar.style.width = percent.toFixed(2) + '%';
                    }
                };

                cc.AssetLibrary.loadJson(json,
                    function (err, sceneAsset) {
                        if (err) {
                            cc.error(err.stack);
                            return;
                        }
                        var scene = sceneAsset.scene;
                        scene._name = sceneAsset._name;
                        cc.director.runSceneImmediate(scene, function () {
                            // play game
                            cc.game.resume();
                        });

                        cc.loader.onProgress = null;
                    }
                );
            });

            // purge
            //noinspection JSUnresolvedVariable
            _CCSettings = undefined;
        });
    };
})();

