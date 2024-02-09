import { TColumns } from "./table.type";

export function getValue(obj: any, keys: string[]): string | undefined {
  let currentObj = obj;

  for (const key of keys) {
    if (currentObj.hasOwnProperty(key)) {
      currentObj = currentObj[key];
    } else {
      return undefined; // 如果某一層的 key 不存在，返回 undefined
    }
  }

  return currentObj;
}

function findRuleByKey(key: string | string[], data: TColumns<any>[]): any | undefined {
  return data.find((rule) => JSON.stringify(rule.key) === JSON.stringify(key));
}

export function hasRenderByKey(key: string | string[], data: TColumns<any>[], obj: any): React.ReactNode | JSX.Element | undefined {
  const rule = findRuleByKey(key, data);

  if (rule) {
    const keys = Array.isArray(rule.key) ? rule.key : [rule.key];
    let currentObj: any = obj;

    for (const k of keys) {
      if (currentObj.hasOwnProperty(k)) {
        currentObj = currentObj[k];
      } else {
        currentObj = undefined;
        break;
      }
    }

    if (currentObj !== undefined && rule.render !== undefined) {
      return rule.render(currentObj, obj, 0); // 傳遞相應的值給 render 函數
    }
  }

  if (rule.render !== undefined) {
    return rule.render("", obj, 0);
  }

  return undefined;
}
