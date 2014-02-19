using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class JobSeeker : MongoEntity
    {
        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        [BsonElement("LastName")]
        public string LastName { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("BirthDay")]
        public string Birthday { get; set; }

        [BsonElement("Password")]
        public string Password { get; set; }

        [BsonElement("UserName")]
        public string UserName { get; set; }
    }

}
