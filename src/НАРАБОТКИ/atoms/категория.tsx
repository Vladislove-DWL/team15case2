// import SkillItem from "./SkillItem";

// interface Skill {
//     name: string;
//     level: number; // Представляет один из уровней (например, можно использовать для первого круга)
//   }
  
//   interface SkillCategoryProps {
//     categoryName: string;
//     skills: Skill[];
//   }
  
//   const SkillCategory: React.FC<SkillCategoryProps> = ({ categoryName, skills }) => {
//     return (
//       <div className="skill-category">
//         <h3>{categoryName}</h3>
//         {skills.map((skill, index) => (
//           <SkillItem 
//             key={index} 
//             name={skill.name} 
//             initialRating1={skill.level} // Используем level для первой оценки
//             initialRating2={1} // Например, вторая оценка по умолчанию 1
//           />
//         ))}
//       </div>
//     );
//   };
  
//   export default SkillCategory;
