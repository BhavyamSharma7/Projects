import java.util.ArrayList;
import java.util.HashMap;

public class Heap<T extends Comparable<T>> 
{
	ArrayList<T> data = new ArrayList<>();
	HashMap<T, Integer> map = new HashMap<>();

	public void add(T item) 
	{																		   // first add the item in the arraylist and then add it into the map
		data.add(item);														   // by using its index as the value and the item itself as the key..
		map.put(item, data.size() - 1);									       // then sort the heap in descending order by using the upheapify
		upheapify(data.size() - 1);											   // func(passing the index of last item as the parameter of child)...
	}

	private void upheapify(int ci)  										    // this func sorts the heap in descending order... the largest
	{																			// item is at the root of the heap and all the items under it are
		int pi = (ci - 1) / 2;                                                  // smaller than the parent....
		if (isLarger(data.get(ci), data.get(pi)) > 0) 						    
			{																	
			swap(pi, ci);														
			upheapify(pi);
		}
	}

	private void swap(int i, int j) 
	{
		T ith = data.get(i);													 // get the items to be swaped..
		T jth = data.get(j);												     // then swap the items in the arraylist according to their

		data.set(i, jth);														 // indices.....
		data.set(j, ith);                                                    	 // then swap the items in the map also....
		map.put(ith, j);
		map.put(jth, i);                                                    
	}

	public void display() 
	{
		System.out.println(data);
	}

	public int size() 
	{
		return this.data.size();
	}

	public boolean isEmpty() 
	{
		return this.size() == 0;
	}

	public T remove()
	{																				  // this func first swaps the last item(which is the largest)
		swap(0, this.data.size() - 1);										      // and the first(which is the smallest) and then removes the
		T rv = this.data.remove(this.data.size() - 1);							     // smallest(now at last index)... removing is done in this way 
		downheapify(0);											                 // to minimise the no. of operations in downheapfy..

		map.remove(rv); 															 //  then we remove the item from the map also...
		return rv;																	 // and return the removed item..
	}																				  
																				     
	private void downheapify(int pi){											     // this function sorts the heap bringing the lowest wieght at
		int lci = 2 * pi + 1;                                                        // the top, that is, parent is smaller than the childer node
		int rci = 2 * pi + 2;                                                        // data..   To do this, we take the parent index as paramter.
		int mini = pi;                                                			     //  In the func we calc the left child index and the right 
                                                  
		if (lci < this.data.size() && isLarger(data.get(lci), data.get(mini)) > 0)   // child index.. then we check if the parent is larger than
		{                                                                            // any one.. either the left or right child.
			mini = lci;                                                              // if yes then, we swap them, otherwise we don't..
		}                                                                            // this is a recursive func..
		
		if (rci < this.data.size() && isLarger(data.get(rci), data.get(mini)) > 0){   
			mini = rci;                                                              
		}                                                                            
		
		if (mini != pi)                                                              
		{                                                                            
			swap(mini, pi);                                                          
			downheapify(mini);                                                       
		}                                                                            
	}                                                                                

	public T get() 
	{
		return this.data.get(0);                                               // get index of the item..
	}

	public int isLarger(T t, T o) 
	{																				 // returns true if 't' is larger than 'o' and otherwise
		return t.compareTo(o);                                                       //  returns false...
	}

	public void updatePriority(T pair) 
	{
		int index = map.get(pair);													 // this func updates the heap whenever a change is made in
		upheapify(index);                                                            // the heap, get index of updation and upheapify from there.
	}
}
