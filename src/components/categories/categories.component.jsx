import CategoryItem from "../category-item/category-item.component"
import "./categories.styles.scss"
const Categories =({categories})=>{
    return (
        <div className="categories-container">
        {categories.map(({title,id,imageUrl})=>
        <CategoryItem title={title} key={id} image={imageUrl}/>
       )}
       </div>)
}
export default Categories