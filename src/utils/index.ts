export type UserInfo = {
  age: number;
  heightCM: number;
  weight: number;
  weightUnit: "kg" | "lb";
  gender: "Male" | "Female";
};

export function isSameDay(date1: string, date2: string) {
  const date1Object = new Date(date1);
  const date2Object = new Date(date2);

  return (
    date1Object.getDate() === date2Object.getDate() &&
    date1Object.getMonth() === date2Object.getMonth() &&
    date1Object.getFullYear() === date2Object.getFullYear()
  );
}

export const promisifyCallbackMethod = <T>(
  method: Function,
  params: any
): Promise<T> => {
  return new Promise((resolve, reject) => {
    method(params, (error: string, results?: T) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results as T);
    });
  });
};

/**
 * Return the first element in an array.
 */
export const first = <T>(array?: T[] | null): T | undefined => {
  if (!array?.length) {
    return;
  }

  return array[0];
};

export const cleanResponseContent = (
  content: string | undefined | null
): string => {
  return content?.replace(/```json|```|json/g, "").trim() ?? "";
};
