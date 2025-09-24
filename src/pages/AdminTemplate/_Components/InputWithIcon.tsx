import * as React from "react";
import { Label } from "@/components/ui/label";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  error?: string;
};

export const InputWithIcon = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, icon, error, className, ...inputProps }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <Label htmlFor={id} className="text-lg">
            {label}
          </Label>
        )}
        <div className="flex items-center rounded-md border border-gray-300 bg-white overflow-hidden">
          {icon && (
            <span className="px-3 bg-gray-50 text-gray-500 border-r border-gray-200 flex items-center">
              {icon}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            {...inputProps}
            className={`h-11 px-3 text-sm outline-none border-0 focus:ring-0 w-full ${className ?? ""}`}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";
