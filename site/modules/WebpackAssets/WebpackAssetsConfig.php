<?php

namespace ProcessWire;

/**
 * Configuration for module WebpackAssets
 *
 * 
 */

class WebpackAssetsConfig extends ModuleConfig
{
    public function __construct()
    {
        $this->add(array(
            array(
                'name' => 'manifestpath',
                'label' => 'Path to webpack manifest JSON',
                'description' => 'Provide the path to the manifest.json file relative to the root of the installation',
                'notes' => 'Example: site/templates/assets/webpack.manifest.json',
                'type' => 'text',
                'required' => true,
                'value' => '',
            ),
        ));
    }
}
