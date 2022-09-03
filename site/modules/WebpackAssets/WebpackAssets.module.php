<?php namespace ProcessWire;

/**
 * Helper module for webpack generated assets
 *
 * provides FilenameArrays with hashed CSS/JS assets URIs based on a webpack generated manifest.json
 * 
 */

class WebpackAssets extends WireData implements Module, ConfigurableModule {

    private static $manifestPath;


	/**
	 * getModuleInfo is a module required by all modules to tell ProcessWire about them
	 *
	 * @return array
	 *
	 */
	public static function getModuleInfo() {

		return array(
			// The module's title, typically a little more descriptive than the class name
			'title' => 'WebpackAssets', 

			// version number 
			'version' => 1, 

			// summary is brief description of what this module is
			'summary' => 'Helper module for webpack generated assets',
			
			// autoload=true: indicates the module should be started with ProcessWire.
			// This is necessary for any modules that attach runtime hooks, otherwise those
			// hooks won't get attached unless some other code calls the module on it's own.
			// Note that autoload modules are almost always also 'singular' (seen above).
			'autoload' => true, 
		
			// Optional font-awesome icon name, minus the 'fa-' part
			'icon' => 'smile-o', 
		);
	}

	/**
	 * Initialize the module
	 *
	 * ProcessWire calls this when the module is loaded. For 'autoload' modules, this will be called
	 * when ProcessWire's API is ready. As a result, this is a good place to attach hooks. 
	 *
	 */
	public function init() {
        $fullpath = wire('config')->paths->root . trim($this->manifestpath, '/');
        if(file_exists($fullpath)) {
            self::$manifestPath = $fullpath;
        } else {
            $this->wire('session')->error("The file {$fullpath} does not exist");
        }
	}

    /**
     * get map of filenames to file uris with hashes
     * @return array ['main.css' => 'main.[hash].css',...] | empty array
     */
    private static function getUrisMap()
    {
        if(file_exists(self::$manifestPath)) {
            return json_decode(file_get_contents(self::$manifestPath), true);
        }
        return array();
    }

    /**
     * convert uri map to associative array with types (js|css|other)
     * takes care of subdirectory installations by prepending correct root url
     * @return array ['type' => 'js|css|other', 'uri' => '/path/to/asset/name.[hash].(js|css), ...]
     */
    public static function assetUris()
    {
        $arr = array();
        foreach (self::getUrisMap() as $key => $uri) {
            // account for subfolder installations -> prepend root url
            // $uri = wire('config')->urls->root . ltrim($uri, '/');

            $type = 'other';
            if (strpos($key, 'js') !== false) $type = 'js';
            if (strpos($key, 'css') !== false) $type = 'css';
            $arr[] = array('type' => $type, 'uri' => $uri);
        }
        return $arr;
    }

    /**
     * get FilenameArray of all css assets
     * @return FilnameArray
     */
    public static function css()
    {
        $arr = new FilenameArray();
        foreach (self::assetUris() as $item) {
            if ($item['type'] === 'css') $arr->add($item['uri']);
        }
        return $arr;
    }

    /**
     * get FilenameArray of all js assets
     * @return FilnameArray
     */
    public static function js()
    {
        $arr = new FilenameArray();
        foreach (self::assetUris() as $item) {
            if ($item['type'] === 'js') $arr->add($item['uri']);
        }
        return $arr;
    }
}