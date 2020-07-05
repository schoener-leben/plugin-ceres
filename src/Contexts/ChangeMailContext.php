<?php

namespace Ceres\Contexts;

use IO\Helper\ContextInterface;

class ChangeMailContext extends GlobalContext implements ContextInterface
{
    public $contactId;
    public $hash;
    public $newMail;
    public $category;

    public function init($params)
    {
        parent::init($params);

        $this->hash = $this->getParam( 'hash');
        $this->contactId = $this->getParam( 'contactId');
        $this->newMail = $this->getParam('newMail');
        $this->category = $this->getParam('category');
    }
}
