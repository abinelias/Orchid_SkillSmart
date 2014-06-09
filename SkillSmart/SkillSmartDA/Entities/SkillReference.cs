using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class SkillReference : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// JobSeekerSkillId
        /// </summary>
        [BsonElement("JobSeekerSkillId")]
        public string JobSeekerSkillId { get; set; }

        /// <summary>
        /// FirstName
        /// </summary>
        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        /// <summary>
        /// LastName
        /// </summary>
        [BsonElement("LastName")]
        public string LastName { get; set; }

        /// <summary>
        /// Position
        /// </summary>
        [BsonElement("Position")]
        public string Position { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        [BsonElement("Description")]
        public string Description { get; set; }

        /// <summary>
        /// Phone
        /// </summary>
        [BsonElement("Phone")]
        public string Phone { get; set; }

        /// <summary>
        /// MethodOfContact
        /// </summary>
        [BsonElement("MethodOfContact")]
        public string MethodOfContact { get; set; }

    }
}
