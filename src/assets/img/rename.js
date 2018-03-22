var path = require("path");
var fs = require("fs");
var rootPath = __filename;
var num = 0;
var ary = [];
renameFilesInDir(path.dirname(rootPath));

function changeFileName(filepath) {
        fs.stat(filepath, function(err, stats) {
                if (stats.isFile()) {
                        //console.log("isFile,chaning filename...");
                        var filename = path.basename(filepath);
                        var parentDir = path.dirname(filepath);
                        var parentDirname = path.basename(path.dirname(filepath));
                        var thisFilename = path.basename(__filename);
                        // console.log(filename, parentDir, parentDirname);
                        //console.log(thisFilename);
                        //这个if就是进行更改文件名的逻辑,可以自行定义,这里定义为将文件命名为当前文件夹的名字加"-文件自身名"
                        if (filename != thisFilename && filename.indexOf(parentDirname) < 0 && /\.(jpg|jpeg|png|gif|web)$/gi.test(filename)) {
                                var name = filename.split('.');
                                var newName = num + "." + name[1];
                                var newPath = parentDir + "\\" + newName;
                                num++;
                                // console.log(newName);
                                fs.rename(filepath, newPath);
                        }
                } else if (stats.isDirectory()) {
                        console.log("============[" + filepath + "] isDir===========");
                        renameFilesInDir(filepath);
                } else {
                        console.log("unknow type of file");
                }
        });
}

function renameFilesInDir(dir) {
        fs.readdir(dir, function(error, files) {
                ary = files;
                var len = files.length;
                var file = null;
                for (var i = 0; i < len; i++) {
                        file = files[i];
                        changeFileName(dir + "\\" + file);
                }
        });
}
