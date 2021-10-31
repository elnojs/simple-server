

export const parseSort = (sort: string): Record<string, number | string> => {
    const result : Record<string, number | string> = {} ;
    if (sort) {
        const [param, value] = sort.split(":");
        result[param] = value;
    }
    return result;

};

/**
 * Returns mongo query object from selfmade formated queryString example q=name:ego,age-lte:20 will translate to {name:"ego", age:{$lte:20}}
 * @param queries:string selfmade formated string to query 
 */
export const stringToQueryObj = (queries: Record<string, any>): Record<string, unknown>=> {
    if (queries) {
        const _queries = {...queries}
        Reflect.deleteProperty(_queries, "limit")
        Reflect.deleteProperty(_queries, "skip")
        Reflect.deleteProperty(_queries, "sort")
        return Object.keys(_queries).reduce((sum:  Record<string, unknown>, objkey: string) => {
           let value = _queries[objkey] as string

            const [key, constrain] = objkey.split("_");

            if (value && constrain) {
                const que : Record<string, unknown>= {};

                if (constrain === "regex") {
                    que[`$${constrain}`] = new RegExp(value);
                } else if (constrain ==="in"){
                    const currentValues = sum[key] && (sum[key] as Record<string, unknown>)[`$${constrain}`];
                    que[`$${constrain}`] = currentValues ? [...(currentValues as Array<string>), value] : [value];
                }else{
                    que[`$${constrain}`] = value;
                }
                
                if(!sum[key]){
                    sum[key] = que;
                }else{
                    sum[key] = {...sum[key] as Record<string, unknown>, ...que};
                }
            }else{
                sum[objkey] = value;
            }
            return sum;
        }, {} );

    }

    return {};
};