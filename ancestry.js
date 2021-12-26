// Format: [parent, child]
const allMembers = [[13,2],[13,12],[13,3],[8,9],[5,9],[1,5],[2,5],[2,7],[3,7],[3,6],[4,6],[6,11],[10,11],[12,10],[6,14],[9,14]];

// Generate array of all members
		const members = [];
		for (let i = 0; i < allMembers.length; i++)
		{
			if (members.includes(allMembers[i][0]) === false)
			{
				members.push(allMembers[i][0]);
			}
			if (members.includes(allMembers[i][1]) === false)
			{
				members.push(allMembers[i][1]);
			}
		}
		console.log("All members: " + members);

// Check how many parents a member has
	const noParents = [];
	const oneParent = [];
	
	// Iterate over every member
	for (let i = 0; i < members.length; i++) 
	{
			let parentCount = 0; 

			// Check every child (second pair value)
			for (let j = 0; j < allMembers.length; j++) 
			{
				if (members[i] === allMembers[j][1])
				{
					parentCount++;
				}
			}
			
			// If loop ends and no parents found add member to noParents array
			if (parentCount === 0) 
			{
				noParents.push(members[i]);
			}

			// If loop ends and no parents found add member to noParents array
			if (parentCount === 1) 
			{
				oneParent.push(members[i]);
			}

			// Reset parent counter for next member
			parentCount = 0; 
	}
	console.log("\nMembers with no parents: " + noParents);
	console.log("Members with one parent: " + oneParent);



// Get a list of all common ancestors of two members
	const compareAncestors = (a,b) =>
	{
		console.log("\nMembers being compared: " + a + " and " + b);
		// Declaring variables for the getAncestorList function. There's probably a much neater way of handling this than declaring these outside the function but did it to handle recursion easily.
		const ancestorsOfA = [];
		const ancestorsOfB = [];

		// Make a list of ancestors
		const getAncestorList = (memberToCompare, arrayToUpdate)  => 
		{
			//console.log("Member being compared: " + memberToCompare);
			let justAddedCount = 0;

			for (let i = 0; i < allMembers.length; i++)
			{
				if ((allMembers[i][1] === memberToCompare) && (arrayToUpdate.includes(allMembers[i][0]) === false))
				{
					arrayToUpdate.push(allMembers[i][0]);
					justAddedCount++;
				}
			}

			// Trigger recursion if we've added any ancestors 
			//console.log(arrayToUpdate + "\n" + justAddedCount);
			if (justAddedCount !== 0)
			{
				// Re-run getAncestorList for each value added to ancestors list on the last run
				for (let i = arrayToUpdate.length - justAddedCount; i < arrayToUpdate.length; i++)
				{
					getAncestorList(arrayToUpdate[i], arrayToUpdate);

				}
			}


		}		

		// Compare the lists of ancestors	
		const compareAncestorLists = (memberA, memberB) =>
		{
			const commonAncestorsList = [];
				for (let i = 0; i < memberA.length; i++)
				{
					if (memberB.includes(memberA[i]))
					{
						commonAncestorsList.push(memberA[i]);
					}
				}
			return commonAncestorsList;
		}

		getAncestorList(a, ancestorsOfA);
		getAncestorList(b, ancestorsOfB);
		

		console.dir("First member's ancestors: " + ancestorsOfA);
		console.dir("Second member's ancestors: " + ancestorsOfB);
		console.dir("Common Ancestor(s): " + compareAncestorLists(ancestorsOfA, ancestorsOfB));

	}

// Run compareAncestors with two inputs
compareAncestors(11,9);
