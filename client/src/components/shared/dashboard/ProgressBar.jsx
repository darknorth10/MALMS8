import { Progress, Typography } from "@material-tailwind/react";
 
export function ProgressBar({percentage, statusText, progressValue}) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-4">
        <Typography color="blue-gray" variant="h6">
          {statusText}
        </Typography>
        <Typography color="blue-gray" variant="h6">
          {percentage}%
        </Typography>
      </div>
      <Progress color="blue" value={progressValue} />
    </div>
  );
}