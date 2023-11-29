import Note from '../models/Note.js';

 const treeControllers = {dataRequired: async(req,res)=>{
    const {startId,endId} = req.body;

    async function findShortestPath ( startId, endId) {
        // Create a queue to store the nodes that need to be visited.
        var queue = [startId];
      
        // Create a map to store the shortest distance from the start node to each node.
        var distances = {};
        distances[startId] = 0;
      
        // While the queue is not empty, visit the next node.
        while (queue.length > 0) {
          // Get the next node from the queue.
          var currentNode = queue.shift();
          var currentObject = await Note.findById(currentNode);
      
          // If the current node is the end node, return the path.
          if (currentNode === endId) {
            return reconstructPath(distances, startId, endId);
          }
          
          // Visit the current node's neighbors.
          for (var neighbor of currentObject.notes) {
            // If the neighbor has not been visited, add it to the queue and update the distance.
            if (!distances[neighbor]) {
              distances[neighbor] = distances[currentNode] + 1;
              queue.push(neighbor);
            }
          }
        }
      
        // If the end node was not found, return null.
        return null;
      }
      
      function reconstructPath(distances, startId, endId) {
        // Create a list to store the path.
        var path = [];
      
        // Start at the end node and add each node to the list until the start node is reached.
        var currentNode = endId;
        while (currentNode !== startId) {
          path.push(currentNode);
          currentNode = distances[currentNode] - 1;
        }
      
        // Reverse the list to get the path from the start node to the end node.
        path.reverse();
        return path;
      }
      var m = await findShortestPath(startId,endId);
      if(m == null) return res.status(302).json({message:"end id not found"})
       return res.status(200).json({path:m});
}}

export default treeControllers;
