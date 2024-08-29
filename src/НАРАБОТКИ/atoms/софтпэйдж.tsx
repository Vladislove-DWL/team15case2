// import DefaultHeader from "../organisms/DefaultHeader";
// import UserSoftHeader from "../organisms/UserSoftHeader";
// import SkillCategory from "../../НАРАБОТКИ/atoms/SkillCategory";

// const UserSoftPage: React.FC = () => {
//   const skillCategories = [
//     {
//       categoryName: "Мышление",
//       skills: [
//         { name: "Поиск и анализ информации", level: 2 },
//         { name: "Логическое мышление", level: 2 },
//         { name: "Креативное мышление", level: 2 },
//         { name: "Системное мышление", level: 2 },
//         { name: "Выработка и принятие решений", level: 2 },
//         { name: "Стратегическое мышление", level: 2 },
//       ],
//     },
//     {
//       categoryName: "Личная эффективность",
//       skills: [
//         { name: "Управление временем", level: 2 },
//         { name: "Управление развитием", level: 1 },
//         { name: "Эмоциональный интеллект", level: 1 },
//         { name: "Управление стрессом", level: 1 },
//         { name: "Энергичность", level: 1 },
//         { name: "Обратная связь", level: 1 },
        
//       ],
//     },
//     {
//       categoryName: "Коммуникация",
//       skills: [
//         { name: "Умение слушать", level: 2 },
//         { name: "Убеждение и аргументрация", level: 1 },
//         { name: "Нетворкинг", level: 1 },
//         { name: "Деловое письмо", level: 1 },
//         { name: "Самопрезентация", level: 1 },
//         { name: "Разработка презентаций", level: 1 },
//         { name: "Публичные выступления", level: 1 },
//         { name: "Командная работа", level: 1 },
//         { name: "Нацеленность на результат", level: 1 },
//         { name: "Клиенто-ориентированность", level: 1 },
//         { name: "Ведение переговоров", level: 1 },
//         { name: "Организация мероприятий", level: 1 },
//         { name: "Фасилитация", level: 1 },
        
//       ],
//     },
//     {
//       categoryName: "Управленческие навыки",
//       skills: [
//         { name: "Планирование", level: 2 },
//         { name: "Управление проектами", level: 1 },
//         { name: "Управление продуктами", level: 1 },
//         { name: "Управление ресурсами", level: 1 },
//         { name: "Управление бюджетом", level: 1 },
//         { name: "Постановка задач и делегирование", level: 1 },
//         { name: "Лидерство и мотивация", level: 1 },
//         { name: "Контроль реализации задач", level: 1 },
//         { name: "Наставничество", level: 1 },
//         { name: "Управление изменениями", level: 1 },
//       ],
//     },
//   ];

//     return (
//       <div className="user-soft-page">
//        <DefaultHeader></DefaultHeader>
//        <UserSoftHeader></UserSoftHeader>
//        <div className="skills-container">
//         {skillCategories.map((category, index) => (
//           <SkillCategory key={index} categoryName={category.categoryName} skills={category.skills} />
//         ))}
//       </div>
//     </div>
//   );
// };
  
//   export default UserSoftPage;

//С ХЭДЕРОМ
// import DefaultHeader from "../organisms/DefaultHeader";
// import UserSoftHeader from "../organisms/UserSoftHeader";

// const UserSoftPage: React.FC = () => {
//     return (
//       <div className="user-soft-page">
//        <DefaultHeader></DefaultHeader>
//        <UserSoftHeader></UserSoftHeader>
//        <h2>софты</h2>
//     </div>
//   );
// };
  
//   export default UserSoftPage;