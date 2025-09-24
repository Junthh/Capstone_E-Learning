import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PageSize({ pageSize, setPageSize }) {
  return (
    <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm">
      <label
        htmlFor="pageSize"
        className="text-sm font-medium text-gray-600 whitespace-nowrap"
      >
        Số lượng / trang:
      </label>

      <Select
        value={String(pageSize)}
        onValueChange={(v) => setPageSize(Number(v))}
      >
        <SelectTrigger
          className="w-[80px] border rounded-md px-3 py-1.5 text-sm 
                     text-gray-700 cursor-pointer focus:ring-0 focus:border-stone-900"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border rounded-md shadow-md">
          {[5, 10, 15, 20].map((size) => (
            <SelectItem
              key={size}
              value={String(size)}
              className="cursor-pointer hover:bg-stone-200"
            >
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
