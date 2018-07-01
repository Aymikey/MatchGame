var MatchGame = {};



$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});


MatchGame.generateCardValues = function () {
  var sequentialValues = [];

  for (var value = 1; value <= 8; value++) {
    sequentialValues.push(value);
    sequentialValues.push(value);
  }

  var cardValues = [];

  while (sequentialValues.length > 0) {
    var randomIndex = Math.floor(Math.random() * sequentialValues.length);
    var randomValue = sequentialValues.splice(randomIndex, 1)[0];
    cardValues.push(randomValue);
  }

  return cardValues;
};



MatchGame.renderCards = function(cardValues, $game) {
  var colors = [
    'hsl(25, 85%, 45%)',
    'hsl(55, 85%, 45%)',
    'hsl(90, 85%, 45%)',
    'hsl(160, 85%, 45%)',
    'hsl(220, 85%, 45%)',
    'hsl(265, 85%, 45%)',
    'hsl(310, 85%, 45%)',
    'hsl(343, 85%, 45%)'];

  $game.empty();
  $game.data('flippedCards', []);

  for (var valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
    var value = cardValues[valueIndex];
    var color = colors[value - 1];
    var data = {
      value: value,
      color: color,
      isFlipped: false
    };

    var $cardElement = $('<div class="col-xs-3 card"></div>');
    $cardElement.data(data);

    $game.append($cardElement);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};



MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('isFlipped', true);

  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(255, 0, 0)')
            .text('')
            .data('isFlipped', false);
        card2.css('background-color', 'rgb(255, 0, 0)')
            .text('')
            .data('isFlipped', false);
      }, 350);
    }
    $game.data('flippedCards', []);
  }
};
