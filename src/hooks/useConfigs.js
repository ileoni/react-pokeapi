import configs from "../configs";

/**
 *  @returns 
 **/
export const useConfigs = (args) => {
  const keys = args?.split('.');

  const recursive = (data, current) => {
    if(data === undefined) return configs;
    
    const [first, ...rest] = data;
    if(data.length === 0) return current;
    return recursive(rest, current[first]);
  }

  return recursive(keys, configs);
}