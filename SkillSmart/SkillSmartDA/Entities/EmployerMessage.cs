using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class EmployerMessage : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// CompanyId
        /// </summary>
        [BsonElement("CompanyId")]
        public string CompanyId { get; set; }

        /// <summary>
        /// EmployerId
        /// </summary>
        [BsonElement("EmployerId")]
        public string EmployerId { get; set; }

        /// <summary>
        /// JobId
        /// </summary>
        [BsonElement("JobId")]
        public string JobId { get; set; }

        /// <summary>
        /// Subject
        /// </summary>
        [BsonElement("Subject")]
        public string Subject { get; set; }

        /// <summary>
        /// Message
        /// </summary>
        [BsonElement("Message")]
        public string Message { get; set; }

        /// <summary>
        /// Date
        /// </summary>
        [BsonElement("Date")]
        public string Date { get; set; }

    }
}

