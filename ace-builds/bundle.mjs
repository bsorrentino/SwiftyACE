import fs from "fs-extra";
import path from "path";


// const targetPath = "dist";
const targetPath = path.join( '..', 'Sources', 'AceEditor', 'Resources', 'ace.bundle')

/**
 * [copyModesAndSnippet description]
 *
 * @param   {string}  syntax  syntax name
 *
 * @return  {Promise<void>}  completion handler
 */
const copyModesAndSnippet = async (  srcPath, syntax ) => {
    // console.debug(  srcPath, syntax );

    const filter = async (src, dest) => { 
        
        const stat = await fs.lstat(src);
        
        if(stat.isDirectory()) {
            return true;
        }

        const fileName = path.basename(src)

        const accept =   path.extname(fileName)==='.js' &&
                         (fileName.startsWith(`mode-${syntax}`) ||
                         fileName.startsWith(`${syntax}`))  
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
const copyCustomModesAndSnippet = async ( syntax_folder, syntax_name ) => {
    if( !syntax_name ) syntax_name = syntax_folder
    return copyModesAndSnippet( path.join('.', syntax_folder ), syntax_name )
}

const copyFiles = async () => {
    const srcPath = path.join('.', 'node_modules', 'ace-builds', 'src-noconflict' ) 
    
    const filter = async (src, dest) => { 
        
        const stat = await fs.lstat(src);
        
        if(stat.isDirectory()) {
            return true;
        }

        const fileName = path.basename(src)

        const accept =  fileName === 'ace.js'               || 
                fileName === 'worker-base.js'       ||
                fileName.startsWith('ext-')         ||
                fileName.startsWith('theme-')       
            ;
        if( accept ) {
            console.debug( `coping: ${fileName} ...`)
        }    
        return accept
        
    }
    
    return fs.copy( srcPath, targetPath, { overwrite: true, filter: filter, recursive: false } )
            
}

copyFiles()
.then( () => copyBuiltInlModesAndSnippet( 'plain_text' ) )
.then( () => copyCustomModesAndSnippet( 'plantuml' ) )
.then( () => copyCustomModesAndSnippet( 'mermaid', 'mermaid' ) )
.then( () => fs.copyFile( 'index.html', path.join(targetPath, 'index.html') ) )
.then(() => console.info( "files copied!") )
