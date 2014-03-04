using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Education : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// InstitutionName
        /// </summary>
        [BsonElement("InstitutionName")]
        public string InstitutionName { get; set; }

        /// <summary>
        /// DegreeId
        /// </summary>
        [BsonElement("DegreeId")]
        public string DegreeId { get; set; }

        /// <summary>
        /// StartDate
        /// </summary>
        [BsonElement("StartDate")]
        public string StartDate { get; set; }

        /// <summary>
        /// EndDate
        /// </summary>
        [BsonElement("EndDate")]
        public string EndDate { get; set; }

        /// <summary>
        /// MajorFocus
        /// </summary>
        [BsonElement("MajorFocus")]
        public string MajorFocus { get; set; }

        /// <summary>
        /// MinorFocus
        /// </summary>
        [BsonElement("MinorFocus")]
        public string MinorFocus { get; set; }

        /// <summary>
        /// CurrentlyEnrolled
        /// </summary>
        [BsonElement("CurrentlyEnrolled")]
        public string CurrentlyEnrolled { get; set; }

        /// <summary>
        /// GPA
        /// </summary>
        [BsonElement("GPA")]
        public string GPA { get; set; }
    }
}
