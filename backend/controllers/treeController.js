import Note from '../models/Note.js';

 const treeControllers = {
  // make this middleware and store the array in res.array
  dataRequired:  async (req, res) => {
   try {
    console.log(req.params);
    const {startId , targetId} = req.params;
     // Find the starting and target notes by their IDs
     const startNote = await Note.findById(startId);
     const targetNote = await Note.findById(targetId);
     const isDescendant = async (parentNote, childNote) => {
      if (parentNote.children.includes(childNote._id)) {
        return true;
      }
    
      for (const childId of parentNote.children) {
        // Recursively check if the child's children are descendants of the parent
        const child = await Note.findById(childId);
        if (isDescendant(child, childNote)) {
          return true;
        }
      }
    
      return false;
    };
     // If either note doesn't exist or they have no parent-child relationship, return null
     if (!startNote || !targetNote || !isDescendant(startNote, targetNote)) {
       return [];
     }
 
     // If start and target IDs are the same, return an empty array (no traversal needed)
     if (startId === targetId) {
      return res.send([startId]);
     }
 
     // Perform BFS to find the shortest path
     const queue = [{ node: startNote, path: [] }];
     const visited = new Set();
     
 
     while (queue.length > 0) {
      // console.log(visited)
       const { node, path } = queue.shift();
 
       visited.add(node._id.toString());
       for (const childId of node.children) {
         const child = await Note.findById(childId);
 
         if (!visited.has(childId.toString())) {
           const newPath = [...path, childId];
          console.log(childId.toString(), " - ", targetId)
          console.log(path)

          
           if (childId.toString() === targetId) {
            console.log(path)
             return res.send(newPath); // Shortest path found
           }
 
           queue.push({ node: child, path: newPath });
         }
       }
     }
 
     // If no path is found
     return res.send([]);
   } catch (error) {
     console.error('Error finding shortest path:', error);
     throw error;
   }
  // Helper function to check if a note is a descendant of another note

  },
  dataForTree:async (req,res)=>{
    try {
      const arr = res.array;
    const re = [];
    async function rec(arr,i, pos ){
      if(i == arr.size()-1){

        return 
      }
      const root = await Note.findById(arr[i]);
      if(i == 0) pos = root;

      for(const  j  =0 ;j < root.children.length; j++){
        const call = await Note.findById(root.children[j]);
        
        pos.children[j] = call;
        if(pos.children[j] != arr[i+1]){
          pos.children = null;
        }
        else{
          rec(arr,i+1,pos.children[j]);
        }
      }
      
    }
    } catch (error) {
      console.log(error)
    }
    
  }
 
}

export default treeControllers;
