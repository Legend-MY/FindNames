
const btn = document.querySelector('.head__button'),
   resultNames = document.querySelector('.result'),
   body = document.querySelector('body'),
   firstFile = 'file1',
   secondFile = 'file2';


btn.addEventListener('click', function () {
   resultNames.textContent = '';
   body.classList.add('loading');
   let firstFileNames = showFileNames(firstFile);
   let secondFileNames = showFileNames(secondFile);
   findUniqueNames(firstFileNames, secondFileNames);
})


// Функция обрабатывает файл и возвращает массив с именами
async function showFileNames(url) {
   let response = await fetch(url);
   let responseText = await response.text();
   let responseArr = await responseText.slice(1, (responseText.length - 2)).split(', ');
   let responseUsers = await responseArr.filter((item) => {
      return item.includes('user');
   }).map((item) => {
      return item.slice(6);
   })

   return responseUsers;
}

// Функция обрабатывает 2 промиса, которые получаются в результате работы функции выше и возвращает массив с именами, которые есть в файле 1, но нет во втором файле
async function findUniqueNames(ArrA, ArrB) {
   let Arrs = await Promise.all([ArrA, ArrB])
      .then(data => {
         return data;
      });

   let difference = await Arrs[0].filter(x => !Arrs[1].includes(x));
   let uniqueArr = await getUnique(difference);
   let result = await showUniqueNames(uniqueArr, resultNames);
   body.classList.remove('loading');
}

// Функция как аргумент принимает массив и формирует новый массив с уникальными значениями, тем самым избавляемся от дублей элементов массива.
function getUnique(arr) {
   let i = 0,
      current,
      length = arr.length,
      unique = [];
   for (; i < length; i++) {
      current = arr[i];
      if (!~unique.indexOf(current)) {
         unique.push(current);
      }
   }
   return unique;
}

// Функция выводит на экран эелементы массива через заяптую, у последнего элемента запятой нет.
function showUniqueNames(arr, result) {
   for (let i = 0; i < arr.length; i++) {
      if (i !== (arr.length - 1)) {
         result.textContent += `${arr[i]}, `;
      } else {
         result.textContent += `${arr[i]}`;
      }
   }
}