import fs from "fs-extra";
import path from "path";


// const targetPath = "dist";
const targetPath = path.join( '..', 'Sources', 'CodeViewer', 'Resources', 'ace.bundle')

/**
 * [copyModesAndSnippet description]
 *
 * @param   {string}  syntax  syntax name
 *
 * @return  {Promise<void>}  completion handler
 */
const copyModesAndSnippet = async (  srcPath, syntax ) => {

    const filter = async (src, dest) => { 
        
        const stat = await fs.lstat(src);
        
        if(stat.isDirectory()) {
            return true;
        }

        const fileName = path.basename(src)

        const accept =   fileName === `mode-${syntax}.js`   ||
                fileName === `${syntax}.js`      
            ;
        if( accept ) {
            console.debug( `coping: ${fileName} ...`)
        }    
        return accept
    }
    return fs.copy( srcPath, targetPath, { overwrite: true, filter: filter, recursive: true } )

}
const copyBuiltInlModesAndSnippet = async ( syntax ) => {
    return copyModesAndSnippet( path.join('.', 'node_modules', 'ace-builds', 'src-noconflict' ), syntax )
}
const copyCustomModesAndSnippet = async ( syntax ) => {
    return copyModesAndSnippet( path.join('.', syntax ), syntax )
}

const copyFiles = async () => {
    const srcPath = path.join('.', 'node_modules', 'ace-builds', 'src-noconflict' ) 
    
    const filter = async (src, dest) => { 
        
        const stat = await fs.lstat(src);
        
        if(stat.isDirectory()) {
            return true;
        }

        const fileName = path.basename(src)

        return  fileName === 'ace.js'               || 
                fileName === 'worker-base.js'       ||
                fileName.startsWith('ext-')         ||
                fileName.startsWith('theme-')       
            ;
    }
    return fs.copy( srcPath, targetPath, { overwrite: true, filter: filter, recursive: false } )
}

copyFiles()
.then( () => copyBuiltInlModesAndSnippet( 'plain_text' ) )
.then( () => copyCustomModesAndSnippet( 'plantuml' ) )
.then(() => console.info( "files copied!") )
