using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class WorkHistory : MongoEntity
    {
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        [BsonElement("CompanyName")]
        public string CompanyName { get; set; }

        [BsonElement("IndustryId")]
        public string IndustryId { get; set; }

        [BsonElement("StartingPosition")]
        public string StartingPosition { get; set; }

        [BsonElement("EndingPosition")]
        public string EndingPosition { get; set; }

        [BsonElement("StartDate")]
        public string StartDate { get; set; }

        [BsonElement("EndDate")]
        public string EndDate { get; set; }

        [BsonElement("CurrentJob")]
        public string CurrentJob { get; set; }

        [BsonElement("WorkTypeId")]
        public string WorkTypeId { get; set; }

        [BsonElement("StartingSalary")]
        public string StartingSalary { get; set; }

        [BsonElement("EndingSalary")]
        public string EndingSalary { get; set; }

        [BsonElement("JobDuties")]
        public string JobDuties { get; set; }
     }

}
