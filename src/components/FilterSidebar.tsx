import { CATEGORY_STRUCTURE } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  minDiscount: number;
  setMinDiscount: (discount: number) => void;
}

export function FilterSidebar({ 
  selectedCategories, 
  setSelectedCategories, 
  minDiscount, 
  setMinDiscount 
}: FilterSidebarProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-8 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div>
        <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-4">Categories</h3>
        <div className="space-y-3">
          {CATEGORY_STRUCTURE.map((cat) => (
            <div key={cat.name} className="flex items-center space-x-2">
              <Checkbox 
                id={`cat-${cat.name}`} 
                checked={selectedCategories.includes(cat.name)}
                onCheckedChange={() => toggleCategory(cat.name)}
              />
              <Label 
                htmlFor={`cat-${cat.name}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-4">Min Discount</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[minDiscount]} 
            max={70} 
            step={5} 
            onValueChange={(val) => setMinDiscount(val[0])}
            className="mb-4"
          />
          <div className="flex justify-between text-xs font-bold text-primary">
            <span>0%</span>
            <span>{minDiscount}%+</span>
            <span>70%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
