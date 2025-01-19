// TODO Implement this library.
import 'package:flutter/material.dart';

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
      } else if (valor == '÷' || valor == 'x' || valor == '-' || valor == '+') {
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
          }
          _entrada = '';
          _operador = '';
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
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          backgroundColor: Colors.blueAccent,
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Calculadora'),
      ),
      body: Column(
        children: [
          // Display principal e secundário
          Expanded(
            flex: 2,
            child: Container(
              alignment: Alignment.centerRight,
              padding: const EdgeInsets.all(20),
              color: Colors.black12,
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
                  Text(
                    _resultado,
                    style: const TextStyle(
                        fontSize: 48,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue),
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
              ],
            ),
          ),
        ],
      ),
    );
  }
}
