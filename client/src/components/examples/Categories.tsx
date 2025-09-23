import Categories from '../Categories'

export default function CategoriesExample() {
  return (
    <Categories
      onCategorySelect={(categoryId) => console.log('Category selected:', categoryId)}
    />
  )
}