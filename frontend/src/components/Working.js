import React from 'react'
import FileUploadComponent from './FileUploadComponent'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Working = () => {
  return (
    <div id='explore'> <div className='ex'><h2 className='ex-title'>Upload Your Research Paper</h2><FileUploadComponent/>  </div>
    <div className='summery'>
      <h2 className='
Summify'>
         Summify</h2>
       <div className='content-sum'> In order to handle conflicts associated  with courses, the courses are ranked based on their total  ranking scores (TRS). In order to handle conflicts associated  with course lecturers, the lecturers are ranked based on their  ranking weight (W). Provision is also made to accommodate  students’ activities constraints. Though the present  mechanism for automating timetable conflict resolution is  tailored towards University of Uyo as the case study, the idea  presented can be adapted or further developed and generalized  to apply to other institutions. Most especially, in the developing countries  where some tertiary institutions run several courses in  multiple campuses with numerous shared facilities scheduling  and managing such timetable system is very tedious  [1,2,3,4,5,6,7,8,9]. The problem is more pronounced where  the timetable is scheduled at the institutional level rather than  at the departmental level [10,11,12, 13]. Again, such is the  case in many institutions in the developing countries where  there are inadequate resources as such, both personal and  facilities are shared among many different departments and  academic units [14,15,16,17,18,19,20,21]. In any case, the advent and advancements in information and  communication technology (ICT) has made it possible to  develop and automate timetable management system  [22,23,24,25,26]. In addition, some institutions go further to  use Google maps or other online map technology to visualize  the venues listed on the timetable [27,28,29]. The major challenges in implementing a  campus-wide  timetable management system are the problems  of  conflicts  and  constraints  which  are  numerous  [30,31,32,33,34,35].. In this paper, the proposed  approach consists of the following four (4) major sections:  i. Assignment of venues and time to courses subject to  the ranking and constraints obtained in sections I, II  and III. For the timetable conflict resolution  mechanism, the courses are ranked based on the level of study  of the students that are supposed to take the course. A course priority score due  to level, L can take the numerical values 6,5,4,3,2 and 1 for  year one, year two, year three, year four, year five and year 6  courses respectively. For example, weights 6, 5,4,3,2 and 1 are  assigned to year 1,2,3,4,5 and 6 courses respectively. The estimated class size (E) for each course is computed as  follows:          25 E =  C  +  S  +  D       Where,   C = number of carryover students in the course obtained from  school result management system    S  =   number of students in the class or classes offering the  course  D  = number of direct entry students. D is applicable only for  year two and three courses   Based on the three different course prioritization parameters,  the total course ranking score (denoted as TRS) of each course  can be computed as follows:  TRS =  L + S + E  The course ranking process is illustrated in the flowchart of  Figure 4. Since a lecturer can take more than one courses in the  university, care is taken to ensure that the courses handled by  the lecturer never occur at the same time on the timetable. Specifically, a lecturer’s course must be assigned to days and  times corresponding to the lecturer’s free times and days. Particularly, some  lecturers due to their ranks and other engagements in the  university may have few available periods for lectures, As  such, cases may arise where two or more lecturers have  similar free days or times and there are limited available free  periods to schedule their lectures. The total weight assigned to a lecturer is given by;     where r is the rank of the lecturer,   is the total number of  appointments held by the lecturer,  is the weight of the     appointment where   = 1,2,3,....,  and W is the ranking weight  of the lecturer. Some of the  students’ activities include;   Free lecture periods  Students’ union  elections  and activities  Students’ week   Most of these activities interrupt lectures and hence, increase  the chances of the course lecturers’ inability to complete their  course outline in the semester. The system provides a platform where the available times,  venues, days, the students free periods and the course  lecturer’s free periods for a particular course affecte d by the  activity are displayed. For each course rank  considered, the  list of lecturers offering the course  of that rank are  considered based on the lecture’s ranking weight  (W); starting with the lecturer with the highest  ranking weight (W). According to Figure 9, the repository of ranked courses  realized from Figure.4 is matched with the repository of  venues sorted by venues’ capacities. First, conflicts  associated with courses, are handled by ranking the courses  based on their total ranking scores (TRS) which is computed  from such parameters as the class size for the course, the level  of study and the number of different department that are  offering the course. Provision is also made to accommodate  students’ activities constraints. In the actual course scheduling  procedure, the venues are first matched with the courses based  on their carrying
        capacity which is enough to accommodate  the course class size.</div> </div>
        <div className='tabbbb'>
        <Tabs
      defaultActiveKey="ConfScore"
      id="uncontrolled-tab-example"
      className="mb-3 ta"
    >
      <Tab eventKey="ConfScore" title="ConfScore">
      ConfScore evaluates the significance of a research paper by scoring it based on the conferences to which it has been submitted, helping researchers gauge the paper's potential impact.
      </Tab>
      <Tab eventKey="ExplainEase" title="ExplainEase">
      ExplainEase generates simplified explanations of complex algorithms, processes, or methodologies from research papers, making the content more accessible to a broader audience with varying levels of expertise.
      </Tab>
      <Tab eventKey="LimitScope" title="LimitScope" >
      LimitScope identifies and analyzes the limitations present in research papers, offering insights into areas where further investigation or improvement may be needed.
      </Tab>
    </Tabs>
        </div>
    </div>

  )
}

export default Working