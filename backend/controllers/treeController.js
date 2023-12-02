import Note from '../models/Note.js';

 const treeControllers = {
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
       return null;
     }
 
     // If start and target IDs are the same, return an empty array (no traversal needed)
     if (startId === targetId) {
      return res.send([]);
     }
 
     // Perform BFS to find the shortest path
     const queue = [{ node: startNote, path: [] }];
     const visited = new Set();
 
     while (queue.length > 0) {
       const { node, path } = queue.shift();
 
       visited.add(node._id.toString());
 
       for (const childId of node.children) {
         const child = await Note.findById(childId);
 
         if (!visited.has(childId.toString())) {
           const newPath = [...path, childId];
 
           if (childId === targetId) {
             return res.send(newPath); // Shortest path found
           }
 
           queue.push({ node: child, path: newPath });
         }
       }
     }
 
     // If no path is found
     return res.send(null);
   } catch (error) {
     console.error('Error finding shortest path:', error);
     throw error;
   }
 
 
 // Helper function to check if a note is a descendant of another note
 
  }
 
}

export default treeControllers;
