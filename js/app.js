function checkStorage() {
    if (!localStorage.getItem('contrast')) {
        populateStorage();
    } else {
        updateView();
    }
}

function populateStorage(e) {
    var prefName, prefVal;
    // if there is an event from the view
    if (e) {
        prefName = $(e.target).attr('name');
        prefVal = $(e.target).val();
        //set the appropriate storage prop with data from the view
        localStorage.setItem(prefName, prefVal);
    }
    updateView();
}

function updateView() {
    var contrast = localStorage.getItem('contrast');
    var userFont = localStorage.getItem('userFont');
    switch (contrast) {
        case "high":
            $('.contrast-control[value="high"]').attr('checked', 'checked');
            $('body').addClass('high-contrast');
            break;
        default:
            $('.contrast-control[value="standard"]').attr('checked', 'checked');
            $('body').removeClass('high-contrast');
    }
    switch (userFont) {
        case "dyslexiaFriendly":
            $('.font-control[value="dyslexiaFriendly"]').attr('checked', 'checked');
            $('body').addClass('dyslexia-friendly');
            break;
        default:
            $('.font-control[value="standard"]').attr('checked', 'checked');
            $('body').removeClass('dyslexia-friendly');
    }
}

$(document).ready(function() {
    var $prefsLink = $('#openPrefs'),
        $prefsModal = $('#prefsModal'),
        $prefsForm = $('form'),
        $prefsInputs = $('#prefsForm input')
        $menuBtn = $('#menu-btn'),
        $menuWrap = $('.menu-wrap');

    document.addEventListener('touchstart', function(e){
        if (e.target !== $menuBtn[0] && ($menuWrap.is(':visible') && $menuBtn.is(':visible'))) {
            $menuWrap.hide();

        }
    });

    $menuBtn.click(function(){
        $menuWrap.show();
    });

    $prefsLink.click(function() {
        $prefsModal.show();
    });

    $prefsForm.submit(function(e) {
        e.preventDefault();
        $prefsModal.hide();
    });

    $prefsInputs.change(function(e) {
        e.preventDefault();
        populateStorage(e);
    });

    checkStorage();

});
