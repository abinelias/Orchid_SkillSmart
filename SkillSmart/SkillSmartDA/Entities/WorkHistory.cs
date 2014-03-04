using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class WorkHistory : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// CompanyName
        /// </summary>
        [BsonElement("CompanyName")]
        public string CompanyName { get; set; }

        /// <summary>
        /// IndustryId
        /// </summary>
        [BsonElement("IndustryId")]
        public string IndustryId { get; set; }

        /// <summary>
        /// StartingPosition
        /// </summary>
        [BsonElement("StartingPosition")]
        public string StartingPosition { get; set; }

        /// <summary>
        /// EndingPosition
        /// </summary>
        [BsonElement("EndingPosition")]
        public string EndingPosition { get; set; }

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
        /// CurrentJob
        /// </summary>
        [BsonElement("CurrentJob")]
        public string CurrentJob { get; set; }

        /// <summary>
        /// WorkTypeId
        /// </summary>
        [BsonElement("WorkTypeId")]
        public string WorkTypeId { get; set; }

        /// <summary>
        /// StartingSalary
        /// </summary>
        [BsonElement("StartingSalary")]
        public string StartingSalary { get; set; }

        /// <summary>
        /// EndingSalary
        /// </summary>
        [BsonElement("EndingSalary")]
        public string EndingSalary { get; set; }

        /// <summary>
        /// JobDuties
        /// </summary>
        [BsonElement("JobDuties")]
        public string JobDuties { get; set; }
     }

}
