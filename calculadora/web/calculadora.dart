import 'package:flutter/material.dart';
import 'dart:math';

class Calculadora extends StatefulWidget {
  @override
  State<Calculadora> createState() => _CalculadoraState();
}

class _CalculadoraState extends State<Calculadora> {
  String _entrada = '';
  String _resultado = '';
  String _operador = '';
  double _numero1 = 0;
  double _numero2 = 0;

  void _pressionarBotao(String valor) {
    setState(() {
      if (valor == 'C') {
        // Limpa os valores
        _entrada = '';
        _resultado = '';
        _operador = '';
        _numero1 = 0;
        _numero2 = 0;
      } else if (['÷', 'x', '-', '+', '^', '√'].contains(valor)) {
        // Salva o operador e o primeiro número
        if (_entrada.isNotEmpty) {
          _numero1 = double.tryParse(_entrada) ?? 0;
          _operador = valor;
          _entrada = '';
        }
      } else if (valor == '=') {
        // Realiza a operação
        if (_entrada.isNotEmpty && _operador.isNotEmpty) {
          _numero2 = double.tryParse(_entrada) ?? 0;
          switch (_operador) {
            case '+':
              _resultado = (_numero1 + _numero2).toString();
              break;
            case '-':
              _resultado = (_numero1 - _numero2).toString();
              break;
            case 'x':
              _resultado = (_numero1 * _numero2).toString();
              break;
            case '÷':
              if (_numero2 != 0) {
                _resultado = (_numero1 / _numero2).toString();
              } else {
                _resultado = 'Erro';
              }
              break;
            case '^':
              _resultado = pow(_numero1, _numero2).toString();
              break;
            case '√':
              _resultado = sqrt(_numero1).toString();
              break;
          }
          _entrada = '';
          _operador = '';
          _mostrarResultado();
        }
      } else {
        // Adiciona números ou ponto à entrada
        if (!(valor == '.' && _entrada.contains('.'))) {
          _entrada += valor;
        }
      }
    });
  }

  Widget _botao(String valor) {
    return Container(
      margin: const EdgeInsets.all(8.0),
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: Colors.pinkAccent.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          backgroundColor: Colors.pink,
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        ),
        onPressed: () => _pressionarBotao(valor),
        child: Text(
          valor,
          style: const TextStyle(
              fontSize: 18.0, fontWeight: FontWeight.bold, color: Colors.white),
        ),
      ),
    );
  }

  void _mostrarResultado() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ResultadoScreen(resultado: _resultado),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Calculadora'),
        backgroundColor: Colors.pinkAccent,
      ),
      body: Column(
        children: [
          // Display principal e secundário
          Expanded(
            flex: 2,
            child: Container(
              alignment: Alignment.centerRight,
              padding: const EdgeInsets.all(20),
              color: Colors.pink[50],
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    _entrada,
                    style: const TextStyle(
                        fontSize: 36, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 10),
                  GestureDetector(
                    onTap: _mostrarResultado,
                    child: Text(
                      _resultado,
                      style: const TextStyle(
                          fontSize: 48,
                          fontWeight: FontWeight.bold,
                          color: Colors.purple),
                    ),
                  ),
                ],
              ),
            ),
          ),
          // Botões da calculadora
          Expanded(
            flex: 5,
            child: GridView.count(
              crossAxisCount: 4,
              children: [
                _botao('7'),
                _botao('8'),
                _botao('9'),
                _botao('÷'),
                _botao('4'),
                _botao('5'),
                _botao('6'),
                _botao('x'),
                _botao('1'),
                _botao('2'),
                _botao('3'),
                _botao('-'),
                _botao('0'),
                _botao('.'),
                _botao('='),
                _botao('+'),
                _botao('C'),
                _botao('^'),
                _botao('√'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class ResultadoScreen extends StatelessWidget {
  final String resultado;

  const ResultadoScreen({Key? key, required this.resultado}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Resultado'),
        backgroundColor: Colors.purpleAccent,
      ),
      body: Container(
        color: Colors.pink[50],
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Resultado:',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.purple,
                ),
              ),
              const SizedBox(height: 20),
              Text(
                resultado,
                style: const TextStyle(
                  fontSize: 48,
                  fontWeight: FontWeight.bold,
                  color: Colors.pink,
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.purple,
                ),
                onPressed: () => Navigator.pop(context),
                child: const Text('Voltar',
                    style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
