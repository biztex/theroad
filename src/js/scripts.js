$(".multi_search_box").slideUp();
$(".category_subject").each(function(e) {
    $(this).click(function() {
        $(this).toggleClass("active");
        $(this).next().slideToggle();
    })
})
$("input[name='all[]']").each(function() {
    $(this).change(function() {
        if ($(this).prop('checked')) {
            $(this).parent().parent().find('input').not(this).prop('checked', false);
        }
    })
    let $this;
    $this = $(this);

    $(this).parent().parent().find('input').not(this).change(function() {
        if ($this.prop('checked')) {
            $this.prop('checked', false)
        }
    })
})

if($(window).width() < 768){
    $(window).scroll(function(){
        if($(this).scrollTop() > 300){
            $("#sortmodal").addClass('active');
        }
        else{
            $("#sortmodal").removeClass('active');

        }
    })
}


const slider = document.getElementById('sliderPrice');
const rangeMin = parseInt(slider.dataset.min);
const rangeMax = parseInt(slider.dataset.max);
const step = parseInt(slider.dataset.step);
const filterInputs = document.querySelectorAll('input.filter__input');

noUiSlider.create(slider, {
    start: [rangeMin, rangeMax],
    connect: true,
    step: step,
    range: {
        'min': rangeMin,
        'max': rangeMax
    },

    // make numbers whole
    format: {
        to: value => value,
        from: value => value
    }
});

// bind inputs with noUiSlider 
slider.noUiSlider.on('update', (values, handle) => {
    if(handle == 1 && values[handle] > 1500000){
        filterInputs[handle].value = null;
    }
    else{
        filterInputs[handle].value = parseInt(values[handle]);
    }
});

// filterInputs.forEach((input, indexInput) => { 
//   input.addEventListener('change', () => {
//     slider.noUiSlider.setHandle(indexInput, input.value);
//   })
// });



$(".filter__action").click(function(e) {
    e.preventDefault();
    let action_url = '';
    let category_url = '';
    let size_url = '';
    let price_min = '';
    let price_max = '';
    $(".category_tree_ input").each(function() {
        if ($(this).prop('checked')) {
            category_url += $(this).val() + ',';
        }
    })
    $(".category_tree_size input").each(function() {
        if ($(this).prop('checked')) {
            size_url += $(this).val() + ',';
        }
    })

    if (category_url != '') {
        category_url = 'tree=' + category_url.slice(0, -1);
        action_url = '?' + category_url;
    }
    if (size_url != '') {
        size_url = 'size=' + size_url.slice(0, -1);

        if (action_url == '') {
            action_url = '?' + size_url.slice(0, -1);
        } else {
            action_url += '&' + size_url.slice(0, -1);
        }

    }
    price_min = $(".filter__input.min").val();
    price_max = $(".filter__input.max").val();

    if (action_url == '') {
        action_url = '?price_min=' + price_min + '&price_max=' + price_max;
    } else {
        action_url += '&price_min=' + price_min + '&price_max=' + price_max;
    }

    let url = window.location.href.split('?')[0];
    $(".categoryform").attr('action', url  + action_url).submit();

})


function get_query() {
    let url = document.location.href;
    let qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}

let result_query = get_query();
let tree_data;
let size_data;
let price_min_data = 0;
let price_max_data = 1500001;


$.each(result_query, function(item, value) {
    if (item == 'tree') {
        tree_data = result_query[item].split(',');
    } else if (item == 'size') {
        size_data = result_query[item].split(',');
    } else if (item == 'price_min') {
        price_min_data = result_query[item];
    } else if (item == 'price_max') {
        price_max_data = result_query[item];
    }
})


if (tree_data != null) {
    let $this;
    if (tree_data.length > 1) {
        $.each(tree_data, function(index) {
            $this = tree_data[index];
            $("input[type='checkbox']").each(function() {
                if ($(this).val() == $this) {
                    $(this).prop('checked', true);
                }
            })
        })
    } else {
        $("input[type='checkbox']").each(function() {
            if ($(this).val() == tree_data) {
                $(this).prop('checked', true);
            }
        })
    }

}

if (size_data != null) {
    let $this;
    if (size_data.length > 1) {
        $.each(size_data, function(index) {
            $this = size_data[index];
            $("input[type='checkbox']").each(function() {
                if ($(this).val() == $this) {
                    $(this).prop('checked', true);
                }
            })
        })
    } else {
        $("input[type='checkbox']").each(function() {
            if ($(this).val() == size_data) {
                $(this).prop('checked', true);
            }
        })
    }

}

$(".filter__input.min").val(price_min_data);
if(price_max_data == 1500000){
    $(".filter__input.man").val(price_max_data);
}
else{
    $(".filter__input.man").val(null);
}
slider.noUiSlider.setHandle(0, price_min_data);
slider.noUiSlider.setHandle(1, price_max_data);


$(".sort_modal, #sortmodal").click(function() {
    $(".leftmenuframe_").fadeIn('slow');
})

$(".close_modal").click(function() {
    $(".leftmenuframe_").fadeOut('slow');
})


$(".clear__action").click(function(){
    $("input[type='checkbox']").each(function () {
        $(this).prop('checked',false);
        slider.noUiSlider.setHandle(0, 0);
        slider.noUiSlider.setHandle(1, 1500001);
    })
})