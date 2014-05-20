using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class SavedJobSearch : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// SearchName
        /// </summary>
        [BsonElement("SearchName")]
        public string SearchName { get; set; }

        /// <summary>
        /// EmployeementType
        /// </summary>
        [BsonElement("EmployeementType")]
        public string EmployeementType { get; set; }

        /// <summary>
        /// Distance
        /// </summary>
        [BsonElement("Distance")]
        public string Distance { get; set; }

        /// <summary>
        /// Industry
        /// </summary>
        [BsonElement("Industry")]
        public string Industry { get; set; }

        /// <summary>
        /// Salary
        /// </summary>
        [BsonElement("Salary")]
        public string Salary { get; set; }

        /// <summary>
        /// carrierLevel
        /// </summary>
        [BsonElement("carrierLevel")]
        public string carrierLevel { get; set; }

        /// <summary>
        /// EducationLevel
        /// </summary>
        [BsonElement("EducationLevel")]
        public string EducationLevel { get; set; }

       
     }

}
