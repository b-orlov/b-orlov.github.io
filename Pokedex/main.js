$(document).ready(function() {
    var
        API = 'http://pokeapi.co',
        PREV,
        NEXT = '/api/v1/pokemon/?limit=9&offset=0';

    chunk('/api/v1/pokemon/?limit=9&offset=0');
    $('.next').on('click', function(){
        chunk(NEXT);
    });
    $('.prev').on('click', function(){
      chunk(PREV);
    });

    function chunk(list) {
        $.get(API + list, function(data) {
            var deck = '';
            for (var i = 0; i < 9; i++) {
                var type = '';
                for (var j = 0; j < data.objects[i].types.length; j++){
                    type += '<span class="' + data.objects[i].types[j].name + '">' + data.objects[i].types[j].name + '</span> '
                }
                NEXT = data.meta.next;
                PREV = data.meta.previous;
                deck += '<div class="col-md-4"> <div class="element" data-uri="'
                      + data.objects[i].resource_uri
                      + '">'
                      + '<img src="' + API + '/media/img/' + data.objects[i].national_id + '.png' + '" alt="Media image..."/>'
                      + '<h4>' + data.objects[i].name + '</h4>'
                      + type
                      + '</div></div>';
            }
            $('.list').html(deck);
            $('.list .element').on('click', click);
        });
    };

    function click(event) {
        var dataUri = $(event.target).data('uri') || $(event.target).parent('.element').data('uri');
        $.get(API + dataUri, function(result) {
            var type = '';
            for (var j = 0; j < result.types.length; j++){
                type += '<span class="' + result.types[j].name + '">' + result.types[j].name + '</span> '
            }
            var html =
                    '<img src="' + API + '/media/img/' + result.national_id + '.png' + '" alt="Media image..."/><br>'
                    + '<h2>' + result.name + ' #' + result.national_id + '</h2>'
                    + type
                    + '<table><tr><td>Attack</td><td>' + result.attack + '</td></tr>'
                    + '<tr><td>Defense</td><td>' + result.defense + '</td></tr>'
                    + '<tr><td>HP</td><td>' + result.hp + '</td></tr>'
                    + '<tr><td>SP Attack</td><td>' + result.sp_atk + '</td></tr>'
                    + '<tr><td>SP Defense</td><td>' + result.sp_def + '</td></tr>'
                    + '<tr><td>Speed</td><td>' + result.speed + '</td></tr>'
                    + '<tr><td>Weight</td><td>' + result.weight + '</td></tr>'
                    + '<tr><td>Total moves</td><td>' + result.moves.length + '</td></tr></table>'
            $('.single').html(html);
        });
    };

    /*$.get('http://pokeapi.co/api/v1/type/?limit=999',function(data){
      console.log(data);
        for (var i = 0; i < data.objects.length; i++){
            console.log(data.objects[i].name);
            element:nth-child(j) .
        }
    })*/
});
