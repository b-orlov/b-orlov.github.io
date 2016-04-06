$(document).ready(function() {
    var
        API = 'http://pokeapi.co',
        PREV,
        NEXT;

    chunk('/api/v1/pokemon/?limit=9&offset=0');
    $('.next').on('click', function(){
        chunk(NEXT);
    });
    $('.prev').on('click', function(){
      chunk(PREV);
    });

    function chunk(list) {
        $.get(API + list, function(data) {
            console.log(data);
            var deck = '';
            for (var i = 0; i < 9; i++) {
                var type = '';
                for (var j = 0; j < data.objects[i].types.length; j++){
                    type += data.objects[i].types[j].name + ' '
                }
                NEXT = data.meta.next;
                PREV = data.meta.previous;
                deck += '<div class="element" data-uri="'
                      + data.objects[i].resource_uri
                      + '">'
                      + '<img src="' + API + '/media/img/' + data.objects[i].national_id + '.png' + '" alt="Media image..."/><br>'
                      + data.objects[i].name
                      + '<br>'
                      + type
                      + '</div>';
            }
            $('.list').html(deck);
            $('.list .element').on('click', click);
        });
    };

    function click(event) {
        var dataUri = $(event.target).data('uri');
        $.get(API + dataUri, function(result) {
            var html =
                    '<img src="' + API + '/media/img/' + result.national_id + '.png' + '" alt="Media image..."/><br>'
                    + result.name + ' #' + result.national_id
                    + '<br>Attack: ' + result.attack
                    + '<br>Defense:' + result.defense
            $('.single').html(html);
        });
    };
});
