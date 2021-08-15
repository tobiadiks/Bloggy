import supabase from './initSupabase'

async  function getCreator(id){
const {data} = await supabase.from('profiles').select('username,fullname,').filter('id', 'eq',id)
    return data[0] 
}

export default getCreator;