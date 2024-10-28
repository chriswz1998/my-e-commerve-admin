UE.registerUI('135editor',function(editor,uiName){
    // var dialog = new UE.ui.Dialog({
    //     iframeUrl: editor.options.UEDITOR_HOME_URL+'dialogs/135editor/135EditorDialogPage.html',
    //     cssRules:"width:"+ parseInt(document.body.clientWidth*0.9) +"px;height:"+(window.innerHeight -50)+"px;",
    //     editor:editor,
    //     name:uiName,
    //     title:"135ç¼–è¾‘å™¨"
    // });
    // dialog.fullscreen = false;
    // dialog.draggable = false;

    var editor135;
    function onContentFrom135(event) {
        if (typeof event.data !== 'string') {
            if(event.data.ready) {
                editor135.postMessage(editor.getContent(),'*');
            }
            return;
        };

        if(event.data.indexOf('<') !== 0) return;

        editor.setContent(event.data);
        editor.fireEvent("catchRemoteImage");
        window.removeEventListener('message', onContentFrom135);
    }

    var btn = new UE.ui.Button({
        name:'btn-dialog-' + uiName,       
        className:'edui-for-135editor',
        title:'135ç¼–è¾‘å™¨',
        onclick:function () {
            // dialog.render();
            // dialog.open();

            // ç”±äºŽå†…åµŒiframeç™»å½•å­˜åœ¨è·¨åŸŸé—®é¢˜ï¼Œç¦ç”¨äº†cookie, ä½¿ç”¨window.openæ–¹å¼è°ƒç”¨135ç¼–è¾‘å™¨
            // è‹¥å®žçŽ°è´¦å·æ‰“é€šï¼Œå…ç™»å½•æ¨¡å¼ï¼Œè¯·è”ç³»135ç¼–è¾‘å™¨å•†åŠ¡
            editor135 = window.open('https://www.135editor.com/beautify_editor.html?callback=true&appkey=','135editor','height='+(window.screen.availHeight-100)+',width='+(window.screen.availWidth-100)+',top=50,left=50,help=no,resizable=no,status=no,scroll=no')
            
            window.removeEventListener('message', onContentFrom135);
            window.addEventListener('message', onContentFrom135, false);
        }
    });
    return btn;
},undefined);