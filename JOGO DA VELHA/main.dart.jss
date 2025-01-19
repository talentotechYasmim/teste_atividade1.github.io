import 'dart:math';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Jogo da Velha',
      debugShowCheckedModeBanner: false, // Remover a faixa de debug
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: NomeJogadorScreen(),
    );
  }
}

class NomeJogadorScreen extends StatefulWidget {
  @override
  _NomeJogadorScreenState createState() => _NomeJogadorScreenState();
}

class _NomeJogadorScreenState extends State<NomeJogadorScreen> {
  final _nomeController = TextEditingController();
  String _nomeJogador = '';

  void _iniciarJogo() {
    if (_nomeController.text.isNotEmpty) {
      setState(() {
        _nomeJogador = _nomeController.text;
      });
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => JogoDaVelha(nomeJogador: _nomeJogador)),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Por favor, insira seu nome!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Jogo da Velha')),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Digite seu nome para começar:',
              style: TextStyle(fontSize: 18),
            ),
            TextField(
              controller: _nomeController,
              decoration: InputDecoration(hintText: 'Nome do Jogador'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _iniciarJogo,
              child: Text('Iniciar Jogo'),
            ),
          ],
        ),
      ),
    );
  }
}

class JogoDaVelha extends StatefulWidget {
  final String nomeJogador;
  JogoDaVelha({required this.nomeJogador});

  @override
  _JogoDaVelhaState createState() => _JogoDaVelhaState();
}

class _JogoDaVelhaState extends State<JogoDaVelha> {
  List<List<String>> tabuleiro = List.generate(3, (_) => List.generate(3, (_) => ''));
  String jogadorAtual = 'X';
  bool terminou = false;
  String vencedor = '';
  String mensagemFinal = '';
  Random random = Random();

  void reiniciarJogo() {
    setState(() {
      tabuleiro = List.generate(3, (_) => List.generate(3, (_) => ''));
      jogadorAtual = 'X';
      terminou = false;
      vencedor = '';
      mensagemFinal = '';
    });
  }

  void fazerMovimento(int linha, int coluna) {
    if (tabuleiro[linha][coluna] == '' && !terminou) {
      setState(() {
        tabuleiro[linha][coluna] = jogadorAtual;

        if (verificarVitoria(jogadorAtual)) {
          vencedor = jogadorAtual;
          terminou = true;
          mensagemFinal = jogadorAtual == 'X'
              ? 'Parabéns, ${widget.nomeJogador}, você venceu!'
              : 'A máquina venceu! Tente novamente.';
        } else if (verificarEmpate()) {
          vencedor = 'Empate';
          terminou = true;
          mensagemFinal = 'O jogo terminou em empate!';
        } else {
          jogadorAtual = jogadorAtual == 'X' ? 'O' : 'X';
          if (jogadorAtual == 'O' && !terminou) {
            _jogadaMaquina();
          }
        }
      });
    }
  }

  void _jogadaMaquina() {
    // A máquina faz uma jogada aleatória
    List<int> posicoesDisponiveis = [];
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        if (tabuleiro[i][j] == '') {
          posicoesDisponiveis.add(i * 3 + j);
        }
      }
    }
    if (posicoesDisponiveis.isNotEmpty) {
      int posicao = posicoesDisponiveis[random.nextInt(posicoesDisponiveis.length)];
      int linha = posicao ~/ 3;
      int coluna = posicao % 3;
      fazerMovimento(linha, coluna);
    }
  }

  bool verificarVitoria(String jogador) {
    for (int i = 0; i < 3; i++) {
      if (tabuleiro[i][0] == jogador && tabuleiro[i][1] == jogador && tabuleiro[i][2] == jogador) {
        return true;
      }
    }
    for (int i = 0; i < 3; i++) {
      if (tabuleiro[0][i] == jogador && tabuleiro[1][i] == jogador && tabuleiro[2][i] == jogador) {
        return true;
      }
    }
    if (tabuleiro[0][0] == jogador && tabuleiro[1][1] == jogador && tabuleiro[2][2] == jogador) {
      return true;
    }
    if (tabuleiro[0][2] == jogador && tabuleiro[1][1] == jogador && tabuleiro[2][0] == jogador) {
      return true;
    }
    return false;
  }

  bool verificarEmpate() {
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        if (tabuleiro[i][j] == '') {
          return false;
        }
      }
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Jogo da Velha')),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (terminou)
            Column(
              children: [
                Text(mensagemFinal, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                ElevatedButton(
                  onPressed: reiniciarJogo,
                  child: Text('Reiniciar Jogo', style: TextStyle(fontSize: 18)),
                ),
              ],
            ),
          if (!terminou)
            Column(
              children: [
                Text('Vez do Jogador: $jogadorAtual', style: TextStyle(fontSize: 18)),
                SizedBox(height: 20),
              ],
            ),
          Column(
            children: List.generate(3, (linha) {
              return Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(3, (coluna) {
                  return GestureDetector(
                    onTap: () {
                      fazerMovimento(linha, coluna);
                    },
                    child: Container(
                      width: 90,
                      height: 90,
                      margin: EdgeInsets.all(5),
                      decoration: BoxDecoration(
                        color: Colors.blue[100],
                        border: Border.all(color: Colors.black, width: 2),
                      ),
                      child: Center(
                        child: Text(
                          tabuleiro[linha][coluna],
                          style: TextStyle(
                            fontSize: 36,
                            fontWeight: FontWeight.bold,
                            color: tabuleiro[linha][coluna] == 'X' ? Colors.red : Colors.green,
                          ),
                        ),
                      ),
                    ),
                  );
                }),
              );
            }),
          ),
        ],
      ),
    );
  }
}
