# Tic-Tac-Toe
My tic-tac-toe implementation (original solution): the solutions I came across hardcoded winning combinations, which I didn't like. Unlike those solutions, here I treat board as a string of characters, and parse it as a matrix, which allows to check if any row, column or diagonal consists fully of same characters which are not whitespace.

![image](https://user-images.githubusercontent.com/67806773/164164056-577c5134-ec47-4dc3-b14d-4de515dcf230.png)

In Python this approach would look like this:
```python
def check_winner(game_result: str) -> str:
    '''
    Example i/o:
      check_winner('XX OOOXOX')
      >>>O
      check_winner('XXXO OXOX')
      >>>X
      print(check_winner('XX O  XOO'))
      >>>Draw
    '''
    rows = [''.join([row for row in game_result[0+row_num*3:3+row_num*3]]) for row_num in range(3)]
    columns = [''.join([cell for cell in game_result[column_num::3]]) for column_num in range(3)]
    fdiagonal = [''.join([cell for cell in game_result[::4]])]
    bdiagonal = [''.join([cell for cell in game_result[2:-1:2]])]
    all_options = rows + columns + fdiagonal + bdiagonal
    for alignment in all_options:
        if  alignment[0] != ' ' and alignment == alignment[0] * 3:
            return alignment[0]
    return 'Draw'
```

As in JavaScript there's no built-in way to slice strings with step, I had to abstract away this slice-with-steps behaviour into a separate JS function.
