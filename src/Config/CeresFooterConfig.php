<?php

namespace Ceres\Config;

use Plenty\Modules\Webshop\Helpers\PluginConfig;

class CeresFooterConfig extends PluginConfig
{
    public $toTopButton;
    public $numberOfFeatures;
    public $numberOfCols;
    public $col1Categories;
    public $col2Categories;
    public $col3Categories;
    public $cancellationUsePdf;
    public $cancellationPdfPath;
    
    protected function getPluginName()
    {
        return 'Ceres';
    }

    protected function load()
    {
        $this->toTopButton          = $this->getTextValue( 'footer.to_top_button', 'right' );
        $this->numberOfFeatures     = $this->getIntegerValue( 'footer.number_of_features', 3 );
        $this->numberOfCols         = $this->getIntegerValue( 'footer.number_of_cols', 3 );
        $this->col1Categories       = $this->getTextValue( 'footer.col_1_categories' );
        $this->col2Categories       = $this->getTextValue( 'footer.col_2_categories' );
        $this->col3Categories       = $this->getTextValue( 'footer.col_3_categories' );
        $this->cancellationUsePdf   = $this->getBooleanValue( 'footer.cancellation_use_pdf', false );
        $this->cancellationPdfPath  = $this->getTextValue( 'footer.cancellation_pdf_path' );
    }
}
