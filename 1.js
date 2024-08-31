// const url = "http://localhost:8081/api/soft/1";
// // const data = {
// //   "email": "roman@mail.com",
// //   "password": "sfdhkjfshdk"
// // }

// fetch(url, {
//   method: "GET", // Указание метода запроса
//   headers: {
//     "Content-Type": "application/json", // Указание, что данные в формате JSON
//   },
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Ошибка в запросе: " + response.status);
//     }
//     return response.json(); // Парсинг ответа в формате JSON
//   })
//   .then(data => {
//     console.log("Успешная регистрация:", data); // Обработка ответа сервера
//   })
//   .catch(error => {
//     console.error("Ошибка:", error); // Обработка ошибок
//   });

  //id профиля
  //список из эл с такими полями:
  //id категории + название
  //id компетенции + название
  // оценка юзера
  // оценка другими

  //регистрация + авторизация с хранением айди
  // общая информация вывод
  // заход на другой профиль без возможности редактирования через поисковик

  //как вернуть json но измененный (нужно поменять уровень с пришедним) - перезапись
  //если добавляется оценка то добавляем в тот же json запись

  //регистрация

//   const url = "http://localhost:8081/api/auth/register";
// const data = {
//   firstName: "Roman",
//   lastName: "Zigmund",
//   middleName: "Petrovich",
//   birthday: "2000-01-11",
//   city: "Москва",
//   phone: "+7999000000",
//   email: "roman@mail.com",
//   password: "sfdhkjfshdk"
// };

// fetch(url, {
//   method: "POST", // Указание метода запроса
//   headers: {
//     "Content-Type": "application/json", // Указание, что данные в формате JSON
//   },
//   body: JSON.stringify(data), // Преобразование объекта в JSON-строку для отправки
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Ошибка в запросе: " + response.status);
//     }
//     return response.json(); // Парсинг ответа в формате JSON
//   })
//   .then(data => {
//     console.log("Успешная регистрация:", data); // Обработка ответа сервера
//   })
//   .catch(error => {
//     console.error("Ошибка:", error); // Обработка ошибок
//   });

 // СОФТЫ
//   const url = "http://localhost:8081/api/soft/1";

// fetch(url, {
//   method: "GET", 
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Ошибка в запросе: " + response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log("Данные:", data); 
//   })
//   .catch(error => {
//     console.error("Ошибка:", error); 
//   });
// const url = "http://localhost:8081/api/soft/1";
// fetch(url, {
//   method: "GET", 
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Ошибка в запросе: " + response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Предполагаем, что data - это массив объектов
//     if (Array.isArray(data)) {
//       data.forEach(item => {
//         console.log(`softSkillId: ${item.softSkillId},`);
//         console.log(`competencyName: '${item.competencyName}',`);
//         console.log(`categoryName: '${item.categoryName}',`);
//         console.log(`softGradeResponses: [`);
        
//         item.softGradeResponses.forEach(response => {
//           console.log(`  { workerId: ${response.workerId}, competencyLevel: ${response.competencyLevel}, competencyLevelId: ${response.competencyLevelId} }`);
//         });
        
//         console.log(`]`);
//       });
//     } else {
//       console.log("Ответ не является массивом.");
//     }
//   })
//   .catch(error => {
//     console.error("Ошибка:", error); 
//   });


// fetch(`http://localhost:8081/api/users/1`)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('User Data:', data);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });


//PUT

// fetch('http://localhost:8081/api/soft', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     softSkillId: 1,
//     workerId: 1,
//     competencyLevelId: 1
//   })
// })
// .then(response => response.text()) // Изменено на text()
// .then(data => {
//   console.log( data); // Здесь будет "Оценка успешна изменена"
// })
// .catch(error => {
//   console.error('There was a problem with the PUT request:', error);
// });

//POST

// fetch('http://localhost:8081/api/soft', {
//   method: 'POST', // Метод POST
//   headers: {
//     'Content-Type': 'application/json', // Указываем тип данных как JSON
//   },
//   body: JSON.stringify({
//     softSkillId: 1,
//     workerId: 14,
//     competencyLevelId: 1
//   })
// })
// .then(response => response.text()) // Обрабатываем ответ как текст
// .then(data => {
//   console.log( data);
// })
// .catch(error => {
//   console.error('There was a problem with the POST request:', error);
// });

// const url = 'http://localhost:8081/api/hard'

// fetch(url, {
//   method: 'GET',
//   headers: {
//         'Content-Type': 'application/json',
//       },
// })
// .then((response) => {
//   return response.json()
// })
// .then((data) => console.log(data))

// //.roles[0].specializations

// Определяем URL и тело запроса
// Определяем URL и тело запроса
// const url = 'http://localhost:8081/api/hard/3';
// const requestBody = {
//     positionId: 6,  // Изменено на данные, отправляемые через Swagger
//     specializationId: 2,
//     freeHours: 8
// };

// // Отправляем POST-запрос
// fetch(url, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json' // Указываем, что отправляем JSON
//     },
//     body: JSON.stringify(requestBody) // Преобразуем объект в строку JSON
// })
// .then(response => {
//     console.log('Response status:', response.status); // Выводим статус ответа
//     return response.text().then(text => {
//         if (!response.ok) {
//             throw new Error(`Network response was not ok: ${response.status} - ${text}`);
//         }
//         return JSON.parse(text); // Парсим ответ как JSON
//     });
// })
// .then(data => {
//     console.log('Success:', data); // Обрабатываем полученные данные
// })
// .catch(error => {
//     console.error('Error:', error); // Обрабатываем ошибки
// });

// fetch('http://10.4.56.61:8081/api/users', {
//   method: 'GET',
//   headers: {
//     'Accept': 'application/json',
//     // Если требуется аутентификация, добавьте заголовок Authorization
//     // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
//   }
// })
// .then(response => {
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// })
// .then(data => {
//   console.log('Полученные данные:', data);
//   // Здесь вы можете обработать полученные данные
// })
// .catch(error => {
//   console.error('Произошла ошибка при выполнении запроса:', error);
// });

  fetch('http://10.4.56.61:8081/api/users', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Полученные данные:', data);
  })
  .catch(error => {
    console.error('Произошла ошибка при выполнении запроса:', error);
  });