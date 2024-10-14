/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// Función para aplicar la Criba de Eratóstenes y encontrar todos los primos menores o iguales a n
var sieve = function (n) {
  "use strict";

  // Crear un array de tamaño n+1, inicializado en true
  var array = new Array(n + 1).fill(true);
  var primes = [];
  var i, j;

  // 0 y 1 no son primos
  array[0] = array[1] = false;

  // Aplicar el algoritmo de la Criba de Eratóstenes
  for (i = 2; i * i <= n; i++) {
      if (array[i]) {
          for (j = i * i; j <= n; j += i) {
              array[j] = false; // Marcar múltiplos de i como no primos
          }
      }
  }

  // Recoger todos los números que son primos
  for (i = 2; i <= n; i++) {
      if (array[i]) {
          primes.push(i);
      }
  }

  return primes;
};

// Función para obtener el valor ingresado y mostrar los primos
function showPrimes() {
  // Obtener el número ingresado por el usuario
  var num = parseInt(document.getElementById("num").value);

  // Verificar si el número es válido
  if (isNaN(num) || num < 2) {
      document.getElementById("primes").innerText = "Please enter a valid number greater than 1.";
      return;
  }

  // Llamar a la función sieve para encontrar los primos
  var primes = sieve(num);

  // Mostrar los números primos en el elemento con id "primes"
  document.getElementById("primes").innerText = primes.join(", ");
}


