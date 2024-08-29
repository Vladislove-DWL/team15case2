// import { useState } from "react";

// interface SkillItemProps {
//   name: string;
//   initialRating1?: number;
//   initialRating2?: number;
// }

// const SkillItem: React.FC<SkillItemProps> = ({ name, initialRating1 = 0, initialRating2 = 0 }) => {
//   const [rating1, setRating1] = useState(initialRating1);
//   const [rating2, setRating2] = useState(initialRating2);

//   const handleRatingChange = (ratingType: 'rating1' | 'rating2', value: number) => {
//       if (ratingType === 'rating1') {
//           setRating1(value);
//       } else {
//           setRating2(value);
//       }
//   };

//   return (
//       <div className="skill-item">
//           <span className="skill-name">{name}</span>
//           <div className="skill-ratings">
//               <div className="rating">
//                   <select
//                       id="rating1"
//                       className="circle"
//                       value={rating1}
//                       onChange={(e) => handleRatingChange('rating1', Number(e.target.value))}
//                   >
//                       <option value={0}>0</option>
//                       <option value={1}>1</option>
//                       <option value={2}>2</option>
//                       <option value={3}>3</option>
//                   </select>
//               </div>
//               <div className="rating">
//                   <select
//                       className="circleOther"
//                       id="rating2"
//                       value={rating2}
//                       onChange={(e) => handleRatingChange('rating2', Number(e.target.value))}
//                   >
//                       <option value={0}>0</option>
//                       <option value={1}>1</option>
//                       <option value={2}>2</option>
//                       <option value={3}>3</option>
//                   </select>
//               </div>
//           </div>
//       </div>
//   );
// };

// export default SkillItem;
