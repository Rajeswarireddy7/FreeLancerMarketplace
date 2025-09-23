import SearchFilters from '../SearchFilters'

export default function SearchFiltersExample() {
  return (
    <div className="p-4 max-w-sm bg-card rounded-lg border">
      <SearchFilters
        type="jobs"
        onFiltersChange={(filters) => console.log('Filters changed:', filters)}
      />
    </div>
  )
}