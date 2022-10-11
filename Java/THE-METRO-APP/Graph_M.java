import java.io.*;
import java.util.*;

public class Graph_M {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // create a map for a particular city, say 'x', that stores all the cities connected to 'x' and distance of the cities from 'x'.
  public class Vertex {
    HashMap<String, Integer> nbrs = new HashMap<>();
  }

  // create the hashmap that stores the name of the station and corresponding connected cities(hashmap --> vertex).
  static HashMap<String, Vertex> vtces;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // initialize 'vtces' to create a empty map..
  public Graph_M() {
    vtces = new HashMap<>();
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public int numVetex() {
    return vtces.size();
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public boolean containsVertex(String vname) {
    return vtces.containsKey(vname);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // add a new station/city to the map vtces..
  public void addVertex(String vname) {
    Vertex vtx = new Vertex();
    vtces.put(vname, vtx);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  public void removeVertex(String vname) {
    Vertex vtx = vtces.get(vname);
    ArrayList<String> keys = new ArrayList<>(vtx.nbrs.keySet());

    for (String key : keys) {
      Vertex nbrVtx = vtces.get(key);
      nbrVtx.nbrs.remove(vname);
    }

    vtces.remove(vname);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public int numEdges() {
    ArrayList<String> keys = new ArrayList<>(vtces.keySet());
    int count = 0;

    for (String key : keys) {
      Vertex vtx = vtces.get(key);
      count = count + vtx.nbrs.size();
    }

    return count / 2;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public boolean containsEdge(String vname1, String vname2) {
    Vertex vtx1 = vtces.get(vname1);
    Vertex vtx2 = vtces.get(vname2);

    if (vtx1 == null || vtx2 == null || !vtx1.nbrs.containsKey(vname2)) {
      return false;
    }

    return true;
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // connect a city/station to some another city/station..
  public void addEdge(String vname1, String vname2, int value) {
    Vertex vtx1 = vtces.get(vname1);
    Vertex vtx2 = vtces.get(vname2);

    if (vtx1 == null || vtx2 == null || vtx1.nbrs.containsKey(vname2)) { // if any station name is invalid or already connected....
      return;
    }

    vtx1.nbrs.put(vname2, value);
    vtx2.nbrs.put(vname1, value);
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // remove connection between a city/station with another..
  public void removeEdge(String vname1, String vname2) {
    Vertex vtx1 = vtces.get(vname1);
    Vertex vtx2 = vtces.get(vname2);

    //check if the vertices given or the edge between these vertices exist or not
    if (vtx1 == null || vtx2 == null || !vtx1.nbrs.containsKey(vname2)) {
      return;
    }

    vtx1.nbrs.remove(vname2);
    vtx2.nbrs.remove(vname1);
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public void display_Map() {
    System.out.println("\t Delhi Metro Map");
    System.out.println("\t------------------");
    System.out.println(
      "-----------------------------------------------------------\n"
    );
    ArrayList<String> keys = new ArrayList<>(vtces.keySet());

    // "keys"(arraylist) contains name of all the main stations/cities 'key' and 'vtx' contains all the stations/cities connected with the 'key'.
    for (String key : keys) {
      String str = key + " =>\n";
      Vertex vtx = vtces.get(key);
      ArrayList<String> vtxnbrs = new ArrayList<>(vtx.nbrs.keySet());

      for (String nbr : vtxnbrs) {
        str = str + "\t" + nbr + "\t";
        if (nbr.length() < 16) str = str + "\t";
        if (nbr.length() < 8) str = str + "\t";
        str = str + vtx.nbrs.get(nbr) + "\n";
      }
      System.out.println(str);
    }
    System.out.println("\t------------------");
    System.out.println("---------------------------------------------------\n");
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public void display_Stations() {
    System.out.println("\n***********************************************************************\n");
    ArrayList<String> keys = new ArrayList<>(vtces.keySet());
    int i = 1;
    for (String key : keys) {
      System.out.println(i + ". " + key);
      i++;
    }
    System.out.println("\n***********************************************************************\n");
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public boolean hasPath(String vname1, String vname2, HashMap<String, Boolean> processed) {
    // DIR EDGE                                                       this function checks wether or not there is an edge or a path between two
    if (containsEdge(vname1, vname2)) {                            // stations 'vname1' and 'vname2'.
      return true;                                                // if they have a direct edge then return true;
    }

    //MARK AS DONE
    processed.put(vname1, true);

    Vertex vtx = vtces.get(vname1);
    ArrayList<String> nbrs = new ArrayList<>(vtx.nbrs.keySet());

                                                          
    for (String nbr : nbrs) {                                  // TRAVERSE THE NBRS OF THE VERTEX....
      if (!processed.containsKey(nbr)) {                      // recursively check wether or not there exists a path between 'vname1' and 'vname2'
        if (hasPath(nbr, vname2, processed)) {               //  through any of the cities connected to 'vname1'...
          return true;
        }
      }
    }

    return false;
  }

  private class DijkstraPair implements Comparable<DijkstraPair> {
    String vname;
    String psf;
    int cost;

    /*
			The compareTo method is defined in Java.lang.Comparable.
			Here, we override the method because the conventional compareTo method
			is used to compare strings,integers and other primitive data types. But
			here in this case, we intend to compare two objects of DijkstraPair class.
			*/

    /*
			Removing the overriden method gives us this errror:
			The type Graph_M.DijkstraPair must implement the inherited abstract method Comparable<Graph_M.DijkstraPair>.compareTo(Graph_M.DijkstraPair)

			This is because DijkstraPair is not an abstract class and implements Comparable interface which has an abstract 
			method compareTo. In order to make our class concrete(a class which provides implementation for all its methods)
			we have to override the method compareTo
			 */
    @Override
    public int compareTo(DijkstraPair o) {
      return o.cost - this.cost;
    }
  }

  public int dijkstra(String src, String des, boolean nan) {
    int val = 0;
    ArrayList<String> ans = new ArrayList<>();
    HashMap<String, DijkstraPair> map = new HashMap<>();

    Heap<DijkstraPair> heap = new Heap<>();

    for (String key : vtces.keySet()) {      // we traverse throught every station ('vtces' contains all stations(<String, Vertex>))
      DijkstraPair np = new DijkstraPair();  // and add all the DjtrPair to the heap and map(in map we use name of vertex as key and
      np.vname = key;                        // its DijkstraPair as value) and while adding if the vertex to be added is src vertex, 
      //np.psf = "";                         //  then we add it after making its cost 0, because the cost toreach src from src is 0..
      np.cost = Integer.MAX_VALUE;           //  then start removing the pairs while heap is not empty.

      if (key.equals(src)) {                 //
        np.cost = 0;                         //
        np.psf = key;                        //
      }                                      //

      heap.add(np);                          //
      map.put(key, np);                      //
    }                                        //

    while (!heap.isEmpty()) {
      DijkstraPair rp = heap.remove();

      if (rp.vname.equals(des)) {
        val = rp.cost;
        break;
      }

      map.remove(rp.vname);

      ans.add(rp.vname);

      Vertex v = vtces.get(rp.vname);
      for (String nbr : v.nbrs.keySet()) {
        if (map.containsKey(nbr)) {
          int oc = map.get(nbr).cost;
          Vertex k = vtces.get(rp.vname);
          int nc;
          if (nan) {
            nc = rp.cost + 120 + 40 * k.nbrs.get(nbr);
          } else {
            nc = rp.cost + k.nbrs.get(nbr);
          }

          if (nc < oc) {
            DijkstraPair gp = map.get(nbr);
            gp.psf = rp.psf + nbr;
            gp.cost = nc;

            heap.updatePriority(gp);
          }
        }
      }
    }
    return val;
  }

  private class Pair {
    String vname;
    String psf;
    int min_dis;
    int min_time;
  }

  public String Get_Minimum_Distance(String src, String dst) {
    int min = Integer.MAX_VALUE;
    //int time = 0;
    String ans = "";
    HashMap<String, Boolean> processed = new HashMap<>();
    LinkedList<Pair> stack = new LinkedList<>();

    // create a new pair
    Pair sp = new Pair();
    sp.vname = src;
    sp.psf = src + "  ";      // "psf" --> it stands for processed so far.....
    sp.min_dis = 0;
    sp.min_time = 0;

    // put the new pair in stack
    stack.addFirst(sp);

    // while stack is not empty keep on doing the work
    while (!stack.isEmpty()) {
      // remove a pair from stack
      Pair rp = stack.removeFirst();

      if (processed.containsKey(rp.vname)) {
        continue;
      }

      // processed put
      processed.put(rp.vname, true);

      //if there exists a direct edge b/w removed pair and destination vertex
      if (rp.vname.equals(dst)) {
        int temp = rp.min_dis;
        if (temp < min) {
          ans = rp.psf;
          min = temp;
        }
        continue;
      }

      Vertex rpvtx = vtces.get(rp.vname);
      ArrayList<String> nbrs = new ArrayList<>(rpvtx.nbrs.keySet());

      for (String nbr : nbrs) {
        // process only unprocessed nbrs
        if (!processed.containsKey(nbr)) {
          // make a new pair of nbr and put in queue
          Pair np = new Pair();
          np.vname = nbr;
          np.psf = rp.psf + nbr + "  ";
          np.min_dis = rp.min_dis + rpvtx.nbrs.get(nbr);
          //np.min_time = rp.min_time + 120 + 40*rpvtx.nbrs.get(nbr);
          stack.addFirst(np);
        }
      }
    }
    ans = ans + Integer.toString(min);
    return ans;
  }

  public String Get_Minimum_Time(String src, String dst) {
    int min = Integer.MAX_VALUE;
    String ans = "";
    HashMap<String, Boolean> processed = new HashMap<>();
    LinkedList<Pair> stack = new LinkedList<>();

    // create a new pair
    Pair sp = new Pair();
    sp.vname = src;
    sp.psf = src + "  ";
    sp.min_dis = 0;
    sp.min_time = 0;

    // put the new pair in queue
    stack.addFirst(sp);

    // while queue is not empty keep on doing the work
    while (!stack.isEmpty()) {
      // remove a pair from queue
      Pair rp = stack.removeFirst();

      if (processed.containsKey(rp.vname)) {
        continue;
      }

      // processed put
      processed.put(rp.vname, true);

      //if there exists a direct edge b/w removed pair and destination vertex
      if (rp.vname.equals(dst)) {
        int temp = rp.min_time;
        if (temp < min) {
          ans = rp.psf;
          min = temp;
        }
        continue;
      }

      Vertex rpvtx = vtces.get(rp.vname);
      ArrayList<String> nbrs = new ArrayList<>(rpvtx.nbrs.keySet());

      for (String nbr : nbrs) {
        // process only unprocessed nbrs
        if (!processed.containsKey(nbr)) {
          // make a new pair of nbr and put in queue
          Pair np = new Pair();
          np.vname = nbr;
          np.psf = rp.psf + nbr + "  ";
          //np.min_dis = rp.min_dis + rpvtx.nbrs.get(nbr);
          np.min_time = rp.min_time + 120 + 40 * rpvtx.nbrs.get(nbr);
          stack.addFirst(np);
        }
      }
    }
    Double minutes = Math.ceil((double) min / 60);
    ans = ans + Double.toString(minutes);
    return ans;
  }

  public ArrayList<String> get_Interchanges(String str) {
    ArrayList<String> arr = new ArrayList<>();
    String res[] = str.split("  ");
    arr.add(res[0]);
    int count = 0;
    for (int i = 1; i < res.length - 1; i++) {
      int index = res[i].indexOf('~');
      String s = res[i].substring(index + 1);

      if (s.length() == 2) {
        String prev = res[i - 1].substring(res[i - 1].indexOf('~') + 1);
        String next = res[i + 1].substring(res[i + 1].indexOf('~') + 1);

        if (prev.equals(next)) {
          arr.add(res[i]);
        } else {
          arr.add(res[i] + " ==> " + res[i + 1]);
          i++;
          count++;
        }
      } else {
        arr.add(res[i]);
      }
    }
    arr.add(Integer.toString(count));
    arr.add(res[res.length - 1]);
    return arr;
  }

  public static void Create_Metro_Map(Graph_M g) {
    g.addVertex("Noida Sector 62~B");
    g.addVertex("Botanical Garden~B");
    g.addVertex("Yamuna Bank~B");
    g.addVertex("Rajiv Chowk~BY");
    g.addVertex("Vaishali~B");
    g.addVertex("Moti Nagar~B");
    g.addVertex("Janak Puri West~BO");
    g.addVertex("Dwarka Sector 21~B");
    g.addVertex("Huda City Center~Y");
    g.addVertex("Saket~Y");
    g.addVertex("Vishwavidyalaya~Y");
    g.addVertex("Chandni Chowk~Y");
    g.addVertex("New Delhi~YO");
    g.addVertex("AIIMS~Y");
    g.addVertex("Shivaji Stadium~O");
    g.addVertex("DDS Campus~O");
    g.addVertex("IGI Airport~O");
    g.addVertex("Rajouri Garden~BP");
    g.addVertex("Netaji Subhash Place~PR");
    g.addVertex("Punjabi Bagh West~P");

    g.addEdge("Noida Sector 62~B", "Botanical Garden~B", 8);
    g.addEdge("Botanical Garden~B", "Yamuna Bank~B", 10);
    g.addEdge("Yamuna Bank~B", "Vaishali~B", 8);
    g.addEdge("Yamuna Bank~B", "Rajiv Chowk~BY", 6);
    g.addEdge("Rajiv Chowk~BY", "Moti Nagar~B", 9);
    g.addEdge("Moti Nagar~B", "Janak Puri West~BO", 7);
    g.addEdge("Janak Puri West~BO", "Dwarka Sector 21~B", 6);
    g.addEdge("Huda City Center~Y", "Saket~Y", 15);
    g.addEdge("Saket~Y", "AIIMS~Y", 6);
    g.addEdge("AIIMS~Y", "Rajiv Chowk~BY", 7);
    g.addEdge("Rajiv Chowk~BY", "New Delhi~YO", 1);
    g.addEdge("New Delhi~YO", "Chandni Chowk~Y", 2);
    g.addEdge("Chandni Chowk~Y", "Vishwavidyalaya~Y", 5);
    g.addEdge("New Delhi~YO", "Shivaji Stadium~O", 2);
    g.addEdge("Shivaji Stadium~O", "DDS Campus~O", 7);
    g.addEdge("DDS Campus~O", "IGI Airport~O", 8);
    g.addEdge("Moti Nagar~B", "Rajouri Garden~BP", 2);
    g.addEdge("Punjabi Bagh West~P", "Rajouri Garden~BP", 2);
    g.addEdge("Punjabi Bagh West~P", "Netaji Subhash Place~PR", 3);
  }

  public static String[] printCodelist() {
    System.out.println("List of station along with their codes:\n");
    ArrayList<String> keys = new ArrayList<>(vtces.keySet());  // vtces is name of stations and a hashmap having all the connected stations..
    int i = 1, j = 0, m = 1;                                  // keys arraylist stores the name of all the stations...
    StringTokenizer stname;                                  // StringTokenizer breaks the string into tokens...
    String temp = "";
    String codes[] = new String[keys.size()];                   // this array stores all the code names of the stations...
    char c;                                                    
    for (String key : keys) {                                 // traverse the keys arraylist..
      stname = new StringTokenizer(key);                     // use every word in the station name as a token to generate a code name...
      codes[i - 1] = "";                                    // let code name as ""
      j = 0;                                                 
      while (stname.hasMoreTokens()) {                    // run the loop until there are no tokens left
        temp = stname.nextToken();                       // take the next token in temp variable
        c = temp.charAt(0);
        while (c > 47 && c < 58) {                     // (c > 47 && c < 58) this range represents a number from 0-9.
          codes[i - 1] += c;                          // add all the starting numbers to the code..
          j++;                                       // loop until all the digits are added to the code..
          c = temp.charAt(j);
        }                                          // (c < 48 || c > 57) means character should not be a number i.e (0-9).
        if ((c < 48 || c > 57) && c < 123)
          codes[i - 1] += c;                     // When the starting numbers are finished and now the alphabets start we dont consider any number..
      }                                         // just the starting character of the token..
  
      if (codes[i - 1].length() < 2) {
          codes[i - 1] += Character.toUpperCase(temp.charAt(1));  // if code length is less than 2 then append the 2nd character of the
      }                                                                 // last used token in the code by capitalising it...

      System.out.print(i + ". " + key + "\t");
      if (key.length() < (22 - m)) System.out.print("\t");  // this part is for indentation in the output terminal... if i is between 1-9 
      if (key.length() < (14 - m)) System.out.print("\t"); // then we need less tab space as compared to when i is between 10-20 and so on..
      if (key.length() < (6 - m)) System.out.print("\t"); // therefore, we use m variable to keep track of power of 10....
      System.out.println(codes[i - 1]);
      i++;
      if (i == (int) Math.pow(10, m)) m++;              // whenever m becomes 10-100-1000 we need to decrease the tab spaces a little...
    }
    return codes;
  }

  public static void main(String[] args) throws IOException {
    Graph_M g = new Graph_M();
    Create_Metro_Map(g);

    System.out.println("\n\t\t\t*****WELCOME TO THE METRO APP*****");
    // System.out.println("\t\t\t\t~~LIST OF ACTIONS~~\n\n");
    // System.out.println("1. LIST ALL THE STATIONS IN THE MAP");
    // System.out.println("2. SHOW THE METRO MAP");
    // System.out.println("3. GET SHORTEST DISTANCE FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
    // System.out.println("4. GET SHORTEST TIME TO REACH FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
    // System.out.println("5. GET SHORTEST PATH (DISTANCE WISE) TO REACH FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
    // System.out.println("6. GET SHORTEST PATH (TIME WISE) TO REACH FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
    // System.out.print("\nENTER YOUR CHOICE FROM THE ABOVE LIST : ");
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    // int choice = Integer.parseInt(inp.readLine());
    //STARTING SWITCH CASE
    while (true) {
      System.out.println("\t\t\t\t~~LIST OF ACTIONS~~\n\n");
      System.out.println("1. LIST ALL THE STATIONS IN THE MAP");
      System.out.println("2. SHOW THE METRO MAP");
      System.out.println("3. GET SHORTEST DISTANCE FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
      System.out.println("4. GET SHORTEST TIME TO REACH FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
      System.out.println("5. GET SHORTEST PATH (DISTANCE WISE) TO REACH FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
      System.out.println("6. GET SHORTEST PATH (TIME WISE) TO REACH FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
      System.out.println("7. EXIT THE MENU");
      System.out.print("\nENTER YOUR CHOICE FROM THE ABOVE LIST (1 to 7) : ");

      int choice = -1;
      try {
        choice = Integer.parseInt(br.readLine());
      } catch (Exception e) {
        System.out.println("Error in choice.... enter a valid input!");
        System.out.println(e);
      }
      System.out.print(
        "\n***********************************************************\n"
      );
      if (choice == 7) {
        System.exit(0);
      }
      switch (choice) {
        case 1:
          g.display_Stations();
          break;
        case 2:
          g.display_Map();
          break;
        case 3:
          ArrayList<String> keys = new ArrayList<>(vtces.keySet());
          String codes[] = printCodelist();                                 // codes array stores all the main station's respective code names...
          System.out.println("\n1. TO ENTER SERIAL NO. OF STATIONS\n2. TO ENTER CODE OF STATIONS\n3. TO ENTER NAME OF STATIONS\n");
          System.out.println("ENTER YOUR CHOICE:");
          int ch = Integer.parseInt(br.readLine());                     // read the choice of the user...
          int j;

          String st1 = "", st2 = "";                                 // create two string s for source and destination...
          System.out.println("ENTER THE SOURCE AND DESTINATION STATIONS");
          if (ch == 1) {
            st1 = keys.get(Integer.parseInt(br.readLine()) - 1);  // if the choice is by serial no.(or index) then find out the name of the station
            st2 = keys.get(Integer.parseInt(br.readLine()) - 1); //  from the arraylist by subtracting 1 from the user input bcoz of 0-based indexing...
          } else if (ch == 2) {
            String a, b;                                       //  if the choice is by code name of the station, then traverse the keys array by
            a = (br.readLine()).toUpperCase();                //  maintaing a variable j and find the index of the station that matches the code
            for (j = 0; j < keys.size(); j++) {              //   that the user has entered and then store it in String 'st1' & 'st2' respectively..
              if (a.equals(codes[j]))
                break;
            }
            st1 = keys.get(j);
            b = (br.readLine()).toUpperCase();
            for (j = 0; j < keys.size(); j++) if (b.equals(codes[j])) break;
            st2 = keys.get(j);
          } else if (ch == 3) {                       //  if user entered the names of the stations then keep them as they are in 'st1' & 'st2'...
            st1 = br.readLine();
            st2 = br.readLine();
          } else {
            System.out.println("Invalid choice");
            System.exit(0);
          }

          HashMap<String, Boolean> processed = new HashMap<>();
          if (!g.containsVertex(st1) || !g.containsVertex(st2) || !g.hasPath(st1, st2, processed)){ // if the src and dest are on the map and we
            System.out.println("THE INPUTS ARE INVALID");                                        // can reach dest from src through any route,
          } else {                                                                                 // then we use dijkstra's algo to find path...
            System.out.println("Shortest Distance From " + st1 + " TO " + st2 + " Is " + g.dijkstra(st1, st2, false) + "KM\n");
          }
          break;
        case 4:
          System.out.print("ENTER THE SOURCE STATION: ");
          String sat1 = br.readLine();
          System.out.print("ENTER THE DESTINATION STATION: ");
          String sat2 = br.readLine();

          // HashMap<String, Boolean> processed1 = new HashMap<>();
          System.out.println("SHORTEST TIME FROM (" + sat1 + ") TO (" + sat2 + ") IS " + g.dijkstra(sat1, sat2, true) / 60 + " MINUTES\n\n");
          break;
        case 5:
          System.out.println("ENTER THE SOURCE AND DESTINATION STATIONS");
          String s1 = br.readLine();
          String s2 = br.readLine();

          HashMap<String, Boolean> processed2 = new HashMap<>();
          if (!g.containsVertex(s1) || !g.containsVertex(s2) || !g.hasPath(s1, s2, processed2)){
              System.out.println("THE INPUTS ARE INVALID");
            } else {
            ArrayList<String> str = g.get_Interchanges(g.Get_Minimum_Distance(s1, s2));
            int len = str.size();
            System.out.println("SOURCE STATION : " + s1);
            System.out.println("DESTINATION STATION : " + s2);
            System.out.println("DISTANCE :  " + str.get(len - 1)+"KM");
            System.out.println("NUMBER OF INTERCHANGES :  " + str.get(len - 2));
            //System.out.println(str);
            System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            System.out.print("--------------------START-------------------\n\n" + str.get(0)+"\n");
            for (int i = 1; i < len - 3; i++) {
              System.out.print(str.get(i)+"\n");
            }
            System.out.print("\n" + str.get(len - 3) + "\n\n--------------------END---------------------");
            System.out.println("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          }
          break;
        case 6:
          System.out.print("ENTER THE SOURCE AND DESTINATION STATIONS: ");
          String ss1 = br.readLine();
          String ss2 = br.readLine();

          HashMap<String, Boolean> processed3 = new HashMap<>();
          if (!g.containsVertex(ss1) || !g.containsVertex(ss2) || !g.hasPath(ss1, ss2, processed3)) {
            System.out.println("THE INPUTS ARE INVALID");
          } else {
            ArrayList<String> str = g.get_Interchanges(g.Get_Minimum_Time(ss1, ss2));
            int len = str.size();
            System.out.println("SOURCE STATION : " + ss1);
            System.out.println("DESTINATION STATION : " + ss2);
            System.out.println("TIME : " + str.get(len - 1) + " MINUTES");
            System.out.println("NUMBER OF INTERCHANGES : " + str.get(len - 2));
            //System.out.println(str);
            System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            System.out.print("START  ==>  " + str.get(0) + "\n ");
            for (int i = 1; i < len - 3; i++) {
              System.out.println(str.get(i));
            }
            System.out.print("Cost: "+ str.get(len - 3) + "\n\n    END");
            System.out.println("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          }
          break;
        default: //If switch expression does not match with any case,
          //default statements are executed by the program.
          //No break is needed in the default case
          System.out.println("Please enter a valid option! ");
          System.out.println("The options you can choose are from 1 to 6. ");
      }
    }
  }
}
