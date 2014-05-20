using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class JobsList : MongoEntity
    {
        /// <summary>
        /// JobPosition
        /// </summary>
        [BsonElement("JobPosition")]
        public string JobPosition { get; set; }

        /// <summary>
        /// CompanyId
        /// </summary>
        [BsonElement("CompanyId")]
        public string CompanyId { get; set; }

        /// <summary>
        /// CompanyName
        /// </summary>
        [BsonElement("CompanyName")]
        public string CompanyName { get; set; }

        /// <summary>
        /// JobLocation
        /// </summary>
        [BsonElement("JobLocation")]
        public string JobLocation { get; set; }

        /// <summary>
        /// PostingDate
        /// </summary>
        [BsonElement("PostingDate")]
        public string PostingDate { get; set; }

        /// <summary>
        /// JobViews
        /// </summary>
        [BsonElement("JobViews")]
        public string JobViews { get; set; }

        /// <summary>
        /// ApplicantsNumber
        /// </summary>
        [BsonElement("ApplicantsNumber")]
        public string ApplicantsNumber { get; set; }

        /// <summary>
        /// ApplicantAverage
        /// </summary>
        [BsonElement("ApplicantAverage")]
        public string ApplicantAverage { get; set; }

        /// <summary>
        /// JobSalary
        /// </summary>
        [BsonElement("JobSalary")]
        public string JobSalary { get; set; }

        /// <summary>
        /// JobDescription
        /// </summary>
        [BsonElement("JobDescription")]
        public string JobDescription { get; set; }
    }
}
