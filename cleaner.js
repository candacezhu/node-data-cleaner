exports.wrap = function(cleanDataHandler) {
    var restStr = "";
    return function(dirtyData) {
        var strTemp = restStr + dirtyData;
        if(strTemp.indexOf("\n") == -1) {
            restStr = strTemp; 
        } else {
            var str = strTemp.split("\n"); 
            for(var i = 0; i < str.length - 1; i++) {
                if(str[i] != '') {
                    cleanDataHandler(str[i]);
                    restStr = "";
                }
            }

            var lastPiece = str[str.length - 1];
            if(strTemp.substring(strTemp.length - 1) == "\n") {
                if(lastPiece != '') {
                    cleanDataHandler(lastPiece);
                    restStr = "";
                }         
            } else {
                restStr = lastPiece;
            }         
        }
    }
}
