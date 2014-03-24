using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class JobSeeker : MongoEntity
    {
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
        /// Email
        /// </summary>
        [BsonElement("Email")]
        public string Email { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [BsonElement("Password")]
        public string Password { get; set; }

    }

}
